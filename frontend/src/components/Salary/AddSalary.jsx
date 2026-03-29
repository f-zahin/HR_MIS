import React, { use, useEffect, useState } from "react";
import { fetchDepartments, getEmpolyess } from "../../utils/EmployeeHelper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deducitons: 0,
    payDate: null,
  });

  useEffect(() => {
    const getDepartments = async () => {
      const dep = await fetchDepartments();
      setDepartments(dep);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/salary/add",
        salary,
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

  const handleDepartment = async (e) => {
    const emp = await getEmpolyess(e.target.value);

    setEmployees(emp);
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
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
                  name="basicSalary"
                  placeholder="basicSalary"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                ></input>
              </div>
              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowence
                </label>
                <input
                  type="number"
                  name="allowances"
                  placeholder="Allowances"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                ></input>
              </div>
              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deduction
                </label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="Deductions"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                ></input>
              </div>

              {/* PayDate */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PayDate
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
};

export default Add;
