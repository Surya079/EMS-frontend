import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";

export const LeaveDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          department: leave.department.department.dep_name,
          leaveType: leave.leaveType,
          name: leave.employeeId.userId.name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          dob: new Date(leave.dob).toLocaleDateString(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <>
      <div className="p-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Leave Details</h3>
        </div>
        <div className="flex justify-between items-center p-2">
          <input
            type="text"
            placeholder="Search by Dep Name"
            className="px-4 py-0.5"
          />
          <div className="flex flex-row gap-2">
            <button className="bg-HeavyDark_green py-1 px-2 rounded-md text-white">
              Pending
            </button>
            <button className="bg-HeavyDark_green py-1 px-2 rounded-md text-white">
              Approved
            </button>
            <button className="bg-HeavyDark_green py-1 px-2 rounded-md text-white">
              Rejected
            </button>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={leaves} pagination />
    </>
  );
};
