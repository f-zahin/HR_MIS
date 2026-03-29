import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../context/authContext";

const AddLeave = () => {
  const navigate = useNavigate();
  const { user } = userAuth();

  const [leave, setLeave] = useState({
    userId:user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LeaveType */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave</option>
              <option value={"Sick Leave"}>Sick</option>
              <option value={"Annaul Leave"}>Annual Leave</option>
              <option value={"Casual Leave"}>Casual Leave</option>
            </select>
          </div>

          {/* StartDate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              StartDate
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            ></input>
          </div>
          {/* Enddate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            ></input>
          </div>
          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="mt-1 p-2 block h-20 w-full border border-gray-300 rounded-md"
              required
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
