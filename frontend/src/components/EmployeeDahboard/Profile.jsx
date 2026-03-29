import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmloyee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      }
    };
    fetchEmloyee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Employee Detials
          </h2>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

           
            <img
              className="rounded-full border w-50"
                src={`http://localhost:5000/${employee.userId.proflileImage}`}
              ></img>
              
              <div className="">
            
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">EmployeeID:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="font-medium">
                  {new Date(employee.dob).toDateString()}
                </p>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalstatus}</p>
              </div>
            </div>
          </div>
            </div>
          
        </div>
         </div>
      ) : (
        <div>Loadding ...</div>
      )}
    </>
  );
};

export default Profile;
