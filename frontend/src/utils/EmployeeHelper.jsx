import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:'145px'
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:'145px'
  },
  {
    name: "Image",
    selector: (row) => row.proflileImage,
    width:'145px'
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:'145px'
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width:'145px'
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      console.log(error.response.data.error);
    }
  }
  return departments;
};

// employee for Dep Id 

export const getEmpolyess = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      console.log(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>
      <button className="px-3 py-1 bg-yellow-600 text-white rounded-md"
      onClick={()=>navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edite
      </button>
      
      <button className="px-3 py-1 bg-blue-600 text-white rounded-md"
      onClick={()=>navigate(`/admin-dashboard/salary/${id}`)}
      >
        Salary
      </button>
      <button className="px-3 py-1 bg-green-600 text-white rounded-md"
      onClick={()=>navigate(`/admin-dashboard/employees/leave/${id}`)}
      >
        Leave
      </button>
    </div>
  );
};


export const Leavecolumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    sortable:true
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable:true
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable:true
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable:true
  },
  {
    name: "days",
    selector: (row) => row.dep_name,
    sortable:true
  },
  
];