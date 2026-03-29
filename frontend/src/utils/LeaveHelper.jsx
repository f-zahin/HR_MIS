import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "145px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "160px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "150px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "145px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const LeaveButton = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leave/detial/${id}`);
  };
  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-800"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};

