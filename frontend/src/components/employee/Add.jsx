import React, { use, useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(() => {
    const getDepartments = async () => {
      const dep = await fetchDepartments();
      setDepartments(dep);
    };
    getDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      // Append manually to make sure
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("employeeId", formData.employeeId);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      data.append("maritalstatus", formData.maritalstatus);
      data.append("designation", formData.designation);
      data.append("department", formData.department);
      data.append("salary", formData.salary);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token})}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Insert Email"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/* EmployeeId */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Id
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/* gender*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Martial Status*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalstatus"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Marital Status</option>
              <option value="engaged">Engaged</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            ></input>
          </div>
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select 
            name="department"
            onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            ></input>
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="******"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/* Martial Status*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rolse
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Upload Image"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
