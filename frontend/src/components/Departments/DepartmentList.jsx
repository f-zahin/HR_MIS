import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmenButton } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartmens] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const OnDepartmentDelete = async (id) => {
    const data = departments.filter((dep) => dep._id !== id);
    setDepartmens(data);
  };

  useEffect(() => {
    const fetchDataComponent = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmenButton
                _id={dep._id}
                OnDepartmentDelete={OnDepartmentDelete}
              />
            ),
          }));
          setDepartmens(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDataComponent();
  }, []);

  const FilteredDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loadding...</div>
      ) : (
        <div className="py-5 ml-8 mr-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="px-4 py-0.5"
              onChange={FilteredDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 ml-10 py-1 bg-teal-600 rounded-md text-white"
            >
              Add New Department
            </Link>
          </div>
          <div>
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default DepartmentList;
