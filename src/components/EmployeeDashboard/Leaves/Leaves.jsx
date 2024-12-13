import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { empColumns } from "../../../utils/LeaveEmpHelper";
import { useAuth } from "../../../Context/Auth_context";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import axios from "axios";
import { toast } from "react-toastify";

export const Leaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.leaves);

        if (response.data) {
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
          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterLeaves = (e) => {
    const searchLeaves = e.target.value.toLowerCase();
    const records = leaves.filter((lev) =>
      lev.leaveType.toLowerCase().includes(searchLeaves)
    );
    setFilteredLeaves(records);
  };

  return loading ? (
    <LoadingOverlay isLoading={loading} />
  ) : (
    <div>
      <div className="p-2 ">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Leaves details</h3>
        </div>
        <div className="flex justify-between items-center p-2">
          <input
            type="text"
            placeholder="Search leaves"
            className="px-4 py-0.5"
            onChange={filterLeaves}
          />
          <Link
            to={"/employee-dashboard/add-leave"}
            className="px-4 py-1 bg-HeavyDark_green rounded text-white">
            Request New Leave
          </Link>
        </div>
      </div>
      <DataTable columns={empColumns} data={filteredLeaves} />
    </div>
  );
};
