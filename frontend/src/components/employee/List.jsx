import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButton } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const { filteredEmployee, setFilterdEmployee } = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployeeLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            proflileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.proflileImage}`}
              />
            ),
            action: <EmployeeButton id={emp._id} />,
          }));
          setEmployees(data);
          setFilterdEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      } finally {
        setEmployeeLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((dep) =>
      dep.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setFilterdEmployee(records);
  };

  return (
    <div className="pt-10 ml-10 mr-10 ">
      <div className="py-15">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Employees</h3>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Dep Name"
            onChange={handleFilter}
            className="px-4 py-0.5"
          />
          <Link
            to="/admin-dashboard/add-employee"
            className="px-4 ml-10 py-1 bg-teal-600 rounded-md text-white"
          >
            Add New Employee
          </Link>
        </div>
        <div className="mt-6 rounded-md">
          <DataTable columns={columns} data={employees} pagination />
        </div>
      </div>
    </div>
  );
};

export default List;
