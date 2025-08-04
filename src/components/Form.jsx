import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, apiData, updateApiData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // update data into Input fields.

  useEffect(() => {
    apiData &&
      setAddData({
        title: apiData.title || "",
        body: apiData.body || "",
      });
  }, [apiData]);

  let empthy = Object.keys(apiData).length === 0;

  const updataPostData = async () => {
    try {
      const res = await updateData(apiData.id, addData);
      console.log(res);
      if (res.status == 200) {
        setData((prev) => {
          return prev.map((currElem) => {
            return currElem.id === res.data.id ? res.data : currElem;
          });
        });
        setAddData({ title: "", body: "" });
        updateApiData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Add Data.
  const handleValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData);
      if (res.status == 201) {
        console.log(res);
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Submit Form.
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updataPostData();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[30vh] bg-gray-100">
      <form
        className="flex flex-wrap md:flex-nowrap gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-200"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Title"
          value={addData.title}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleValue}
        />

        <input
          type="text"
          name="body"
          id="body"
          value={addData.body}
          placeholder="Enter Detail"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleValue}
        />

        <button
          type="submit"
          value={empthy ? "Add" : "Edit"}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          {empthy ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};
