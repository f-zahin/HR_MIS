import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataComponent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDataComponent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token);
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        },
      );

      if (response.data.success) {
        console.log("Ok untill here");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Loadding...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Add NewDepartment</h2>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                name="dep_name"
                type="text"
                value={department.dep_name}
                placeholder="Enter Department Name"
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={department.description}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6  bg-teal-600 hover:bg-teal-700 border-t-gray-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edite Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
