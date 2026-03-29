import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/employeeDashboard.jsx";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import PrivateRoute from "./utils/PrivateRoute";
import AdminSummary from "./components/AdminDashboard/AdminSummary";
import DepartmentList from "./components/Departments/DepartmentList";
import AddDepartment from "./components/Departments/AddDepartment";
import EditDepartment from "./components/Departments/EditDepartment";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import ViewEmployee from "./components/employee/ViewEmployee.jsx";
import Edit from "./components/employee/EditeEmployee.jsx";
import AddSalary from "./components/Salary/AddSalary.jsx";
import View from "./components/Salary/View.jsx";
import Summary from "./components/EmployeeDahboard/Summary.jsx";
import Profile from "./components/EmployeeDahboard/Profile.jsx";
import LeaveList from "./components/Leave/LeaveList.jsx";
import AddLeave from "./components/Leave/AddLeave.jsx";
import Setting from "./components/EmployeeDahboard/Setting.jsx";
import TableLeave from "./components/Leave/TableLeave.jsx"
import Detail from "./components/Leave/Detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
        <Route index element={<AdminSummary />}></Route>
        <Route
          path="/admin-dashboard/departments"
          element={<DepartmentList />}
        ></Route>
        <Route
          path="/admin-dashboard/add-department"
          element={<AddDepartment />}
        ></Route>
        <Route
          path="/admin-dashboard/department/:id"
          element={<EditDepartment />}
        ></Route>
        <Route path="/admin-dashboard/employees" element={<List />}></Route>
        <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
        <Route
          path="/admin-dashboard/employees/:id"
          element={<ViewEmployee />}
        ></Route>
        <Route
          path="/admin-dashboard/employees/edit/:id"
          element={<Edit />}
        ></Route>
        <Route
          path="/admin-dashboard/salary/add"
          element={<AddSalary />}
        ></Route>

        <Route path="/admin-dashboard/salary/:id" element={<View />}></Route>
        <Route path="/admin-dashboard/leave" element={<TableLeave />}></Route>
        <Route path="/admin-dashboard/leave/detial/:id" element={<Detail />}></Route>
        <Route path="/admin-dashboard/setting" element={<Setting />}></Route>


          </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<Summary/>} />
          <Route path="/employee-dashboard/profile/:id" element={<Profile />} />
          <Route path="/employee-dashboard/leaves" element={<LeaveList />} />
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
          <Route path="/employee-dashboard/salary/:id" element={<View />} />
          <Route path="/employee-dashboard/setting" element={<Setting />} />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
