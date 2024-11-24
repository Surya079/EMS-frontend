import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendar,
  FaCogs,
  FaMoneyBill,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../Context/Auth_context";

export const EmployeeSidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-light_green font-popins text-black h-screen border-r-2 fixed left-0 top-0 bottom-0 space-y-2 w-64 ">
      <div className="font-bold text-2xl p-3 flex items-center justify-center text-white bg-HeavyDark_green">
        <h3>Employee MS</h3>
      </div>
      <div className="p-2 flex flex-col gap-3 ">
        <NavLink
          to={"/employee-dashboard"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaUser />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={"/employee-dashboard/salary"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to={"/employee-dashboard/leaves"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaCalendar />
          <span>leaves</span>
        </NavLink>
        <NavLink
          to={"/employee-dashboard"}
          className={"flex items-center space-x-4 py-2.5 px-4 rounded"}>
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
