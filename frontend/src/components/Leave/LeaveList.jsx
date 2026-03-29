import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userAuth } from "../../context/authContext";

const LeaveList = () => {
   const [leave, setLeaves] = useState([]);
  const [filteredSalary, setFilteredSalaries] = useState(null);

  let sn=1;
  const { user } = userAuth();

  useEffect(() => {
    // prevent undefined call

    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setLeaves(response.data.leave);
        sn++;
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeave();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Dep Name"
          className="px-4 py-0.5 border"
        ></input>
        {user.role === 'employee' && <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>}
        
      </div>
      <div className="overflow-x-auto p-5">
        
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Status</th>
                
                <th className="px-6 py-3">AppliedAt Date</th>
              </tr>
            </thead>
            <tbody>
              {leave.map((leave) => (
                <tr
                  key={leave.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-3"> {sn++}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>

                  
                  <td className="px-6 py-3">
                    {new Date(leave.startDate).toDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(leave.endDate).toDateString()}
                  </td>
                 
                  <td className="px-6 py-3"> {leave.reason}</td>
                  <td className="px-6 py-3"> {leave.status}</td>
                   <td className="px-6 py-3">
                    {new Date(leave.appliedAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
      
    </div>
  );
};

export default LeaveList;
