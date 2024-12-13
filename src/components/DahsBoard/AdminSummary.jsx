import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";

export const AdminSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalSalaries, setTotalSalaries] = useState(0);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalPendingLeaves, setTotalPendingLeaves] = useState(0);
  const [totalRejectedLeaves, setTotalRejectedLeaves] = useState(0);
  const [totalApprovedLeaves, setTotalApprovedLeaves] = useState(0);

  // Fetch
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setTotalEmployees(response.data.employees.length);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();

    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setTotalDepartments(response.data.departments.length);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartments();

    const fetchSalarydata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salary/all/salaries`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setTotalSalaries(response.data.salaryData.length);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }
    };
    fetchSalarydata();

    const fetchLeaves = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/leave", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setTotalLeaves(response.data.leaves.length);
          response.data.leaves.map((leave) => {
            if (leave.status === "Pending") {
              setTotalPendingLeaves((prev) => prev + 1);
            } else if (leave.status === "Rejected") {
              setTotalRejectedLeaves((prev) => prev + 1);
            } else if (leave.status === "Approved") {
              setTotalApprovedLeaves((prev) => prev + 1);
            }
          });
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaves();
  }, []);
  return (
    <div className="p-6">
      <h3 className="font-bold text-3xl">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icons={<FaUsers />}
          text={"Total Employees"}
          numbers={totalEmployees}
          color={"bg-Dark-violet"}
        />
        <SummaryCard
          icons={<FaBuilding />}
          text={"Total Departments"}
          numbers={totalDepartments}
          color={"bg-Dark-violet"}
        />
        <SummaryCard
          icons={<FaMoneyBillWave />}
          text={"Total Salary"}
          numbers={totalSalaries}
          color={"bg-Dark-violet"}
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl text-center p-3  font-bold">Leave Details</h3>
        <div className="grid gird-row-1 md:grid-cols-2 gap-4 mt-6">
          <SummaryCard
            icons={<FaFileInvoice />}
            text={"Leave Applied"}
            numbers={totalLeaves}
            color={"bg-Dark-violet"}
          />
          <SummaryCard
            icons={<SiTicktick />}
            text={"Leave Approved"}
            numbers={totalApprovedLeaves}
            color={"bg-green-800"}
          />
          <SummaryCard
            icons={<GiSandsOfTime />}
            text={"Leave pending"}
            numbers={totalPendingLeaves}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icons={<FaRegTimesCircle />}
            text={"Leave Rejected"}
            numbers={totalRejectedLeaves}
            color={"bg-red-600"}
          />
        </div>
      </div>
    </div>
  );
};
