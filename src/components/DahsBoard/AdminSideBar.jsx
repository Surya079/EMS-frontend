import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBill,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";

export const AdminSideBar = () => {
  return (
    <div className="bg-light_green font-popins text-black h-screen border-r-2 fixed left-0 top-0 bottom-0 space-y-2 w-64 ">
      <div className="font-bold text-2xl p-3 flex items-center justify-center text-white bg-HeavyDark_green">
        <h3>Employee MS</h3>
      </div>
      <div className="p-2 flex flex-col gap-3 ">
        <NavLink
          to={"/admin-dashboard"}
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
          to={"/admin-dashboard/employees"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaUser />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/departments"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/salary"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaMoneyBill />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/leaves"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaCalendar />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/settings"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-HeavyDark_green text-white" : " "
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }>
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
