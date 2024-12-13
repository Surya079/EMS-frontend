import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { empColumns } from "../../utils/LeaveEmpHelper";
import { toast } from "react-toastify";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

export const LeaveData = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const [leavedata, setLeavedata] = useState([]);

  useEffect(() => {
    const fetchLeavedata = async () => {
      try {
        setIsloading(true);
        const response = await axios.get(
          `http://localhost:3000/api/leave/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = response.data.leaves.map((lev) => ({
            _id: lev._id,
            sno: sno++,
            leaveType: lev.leaveType,
            startDate: lev.startDate,
            endDate: lev.endDate,
            comments: lev.comments,
            status: lev.status,
          }));
          setLeavedata(data);
          setIsloading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setIsloading(false);
      }
    };

    fetchLeavedata();
  }, [id]);

  return isLoading ? (
    <LoadingOverlay isLoading={isLoading} />
  ) : (
    <div className="mt-4">
      <h1 className="font-bold text-center text-2xl flex gap-2 justify-content flex-col">
        Leave History
      </h1>
      <div>
        <DataTable columns={empColumns} data={leavedata} />
      </div>
    </div>
  );
};
