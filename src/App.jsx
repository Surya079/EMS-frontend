import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Employee_dashboard } from "./pages/Employee_dashboard";
import { PrivateRoute } from "./utils/PrivateRoute";
import { RoleBaseRoute } from "./utils/RoleBaseRoute";
import { AdminSummary } from "./components/DahsBoard/AdminSummary";
import { DepartmentList } from "./components/Department/DepartmentList";
import { AddDepartment } from "./components/Department/AddDepartment";
import { EditDepartment } from "./components/Department/EditDepartment";
import List from "./components/Employee/List";
import { Add } from "./components/Employee/Add";
import { View } from "./components/Employee/View";
import { Edit } from "./components/Employee/Edit";
import { AddSalary } from "./components/Salary/AddSalary";
import { SalaryData } from "./components/Employee/SalaryData";
import { EmployeeSummary } from "./components/EmployeeDashboard/EmployeeSummary";
import { Profile } from "./components/EmployeeDashboard/Profile/Profile";
import { Salary } from "./components/EmployeeDashboard/Salary/Salary";
import { Leaves } from "./components/EmployeeDashboard/Leaves/Leaves";
import { LeaveDetails } from "./components/Leaves/LeaveDetails";
import { LeaveViews } from "./components/Leaves/LeaveViews";
import { AddLeave } from "./components/EmployeeDashboard/Leaves/RrquestLeave";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* Admin Dahsboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoute>
            </PrivateRoute>
          }>
          {/* This the admin dashboard is parent component for outlet child component */}
          {/* Admin summary  */}
          <Route index element={<AdminSummary />}></Route>

          {/* department managements */}
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}></Route>

          {/* Employee managements */}
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route
            path="/admin-dashboard/employee/:id"
            element={<View />}></Route>
          <Route
            path="/admin-dashboard/employee/edit/:id"
            element={<Edit />}></Route>
          <Route
            path="/admin-dashboard/employee/salary/:id"
            element={<SalaryData />}></Route>

          {/* Salary managements */}
          <Route path="/admin-dashboard/salary" element={<AddSalary />}></Route>

          {/* Leave managements */}
          <Route
            path="/admin-dashboard/leaves"
            element={<LeaveDetails />}></Route>
          <Route
            path="/admin-dashboard/leave/:id"
            element={<LeaveViews />}></Route>
        </Route>

        {/* Employee dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin", "employee"]}>
                <Employee_dashboard />
              </RoleBaseRoute>
            </PrivateRoute>
          }>
          {/* Employee child components */}
          <Route index element={<EmployeeSummary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<Profile />}></Route>
          <Route path="/employee-dashboard/salary" element={<Salary />}></Route>
          <Route path="/employee-dashboard/leaves" element={<Leaves />}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
