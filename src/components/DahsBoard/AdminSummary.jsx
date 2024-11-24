import React from "react";
import { SummaryCard } from "./SummaryCard";
import {
  FaBuilding,
  FaFileInvoice,
  FaMoneyBillWave,
  FaUsers,
  FaRegTimesCircle,
} from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { GiSandsOfTime } from "react-icons/gi";

export const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="font-bold text-3xl">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icons={<FaUsers />}
          text={"Total Employees"}
          numbers={13}
          color={"bg-Dark-violet"}
        />
        <SummaryCard
          icons={<FaBuilding />}
          text={"Total Departments"}
          numbers={10}
          color={"bg-Dark-violet"}
        />
        <SummaryCard
          icons={<FaMoneyBillWave />}
          text={"Total "}
          numbers={10}
          color={"bg-Dark-violet"}
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl text-center p-3  font-bold">Leave Details</h3>
        <div className="grid gird-row-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard
            icons={<FaFileInvoice />}
            text={"Leave Applied"}
            numbers={5}
            color={"bg-Dark-violet"}
          />
          <SummaryCard
            icons={<SiTicktick />}
            text={"Leave Approved"}
            numbers={2}
            color={"bg-green-800"}
          />
          <SummaryCard
            icons={<GiSandsOfTime />}
            text={"Leave pending"}
            numbers={6}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icons={<FaRegTimesCircle />}
            text={"Leave Rejected"}
            numbers={12}
            color={"bg-red-600"}
          />
        </div>
      </div>
    </div>
  );
};
