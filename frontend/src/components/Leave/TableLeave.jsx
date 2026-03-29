import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButton } from "../../utils/LeaveHelper";

const TableLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterdLeaves, setFilterLeaves] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;

        const data = response.data.leaves
          .filter((leave) => leave.employeeId)
          .map((leave) => ({
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId?.userId?.name || "N/A",
            leaveType: leave.leaveType,
            department: leave.employeeId?.department?.dep_name || "N/A",
            days: Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ),
            status: leave.status,
            action: <LeaveButton Id={leave._id} />,
          }));

        setLeaves(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // ✅ very important
    }
  };

  fetchLeaves();
}, []);

const filterByButton= async (status)=>{
    const data = leaves.filter((leave)=>
    leave.status.toLowerCase().includes(status.toLowerCase())
    )

    setFilterLeaves(data);
}

  return (
    <>
      {loading  ? (
        <div>Loading .... </div>
      ) : (
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
            <div className="justify-between space-x-2">
              <button className="px-4 py-1 bg-teal-600 rounded text-white"
              onClick={()=>filterByButton('pending')}
              >
                Pending
              </button>
              <button className="px-4 py-1 bg-teal-600 rounded text-white"
              onClick={()=>filterByButton('rejected')}
              >
                Approved
              </button>
              <button className="px-4 py-1 bg-teal-600 rounded text-white"
              onClick={()=>filterByButton('approved')}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-5">
    <DataTable columns={columns} data={filterdLeaves} pagination />
          </div>
      
        </div>
      )}
    </>
  );
};

export default TableLeave;
