import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { adminColumns, LeaveButtons } from "../../utils/LeaveAdminHelper";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import axios from "axios";
import { toast } from "react-toastify";

export const LeaveDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.emp_Id.employeeId,
          name: leave.emp_Id.userId.name,
          leaveType: leave.leaveType,
          department: leave.emp_Id.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate() +
            1,
          comments: leave.comments,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
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
  useEffect(() => {
    fetchLeaves();
  }, []);

  const handlefilteredLeaves = (e) => {
    const searchtem = e.target.value.toLowerCase();
    const filterleave = leaves.filter((leave) =>
      leave?.status?.toLowerCase().includes(searchtem)
    );
    setFilteredLeaves(filterleave);
  };
  return isLoading ? (
    <LoadingOverlay isLoading={isLoading} />
  ) : (
    <>
      <div className="p-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Leave Details</h3>
        </div>
        <div className="flex justify-between items-center p-2">
          <input
            type="text"
            placeholder="Search by status"
            className="px-4 py-0.5"
            onChange={handlefilteredLeaves}
          />
        </div>
      </div>
      <DataTable columns={adminColumns} data={filteredLeaves} pagination />
    </>
  );
};
