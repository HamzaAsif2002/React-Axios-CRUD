import { useEffect } from "react";
import { useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiData, updateApiData] = useState({});

  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  //handle delete:

  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const updatedPost = data.filter((currelem) => {
          return currelem.id !== id;
        });
        setData(updatedPost);
      } else {
        console.warn("Delete failed with status:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Edit Data:

  const handleEditData = (currElem) => {
    updateApiData(currElem);
  };

  // set Loading state.
  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="w-full px-6 py-10 bg-gray-100 min-h-screen">
      <div>
        <Form
          data={data}
          setData={setData}
          apiData={apiData}
          updateApiData={updateApiData}
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {data.map((currElem, index) => {
          const { id, title, body } = currElem;
          return (
            <li
              key={id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <span className="text-gray-500 text-sm mb-2 block">
                Post #{index + 1}
              </span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{body}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEditData(currElem)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
