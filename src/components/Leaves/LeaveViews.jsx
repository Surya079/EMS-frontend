import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";

export const LeaveViews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState([]);

  useEffect(() => {
    const fetchLeavedetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/views/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeaveDetails(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeavedetails();
  }, []);

  const handleLeaveActions = async (id, status) => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (status === "Approved") {
          toast.success("Leave Approved Successfully");
        } else if (status === "Rejected") {
          toast.success("Leave Rejected Successfully");
        }
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server Error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="text-center">
          <h1 className="font-bold py-2 text-3xl"> Leave Details</h1>
        </div>
        {isLoading ? (
          <LoadingOverlay isLoading={isLoading} />
        ) : (
          <div className="flex flex-col justify-center items-center bg-white rounded p-4">
            <div>
              <img
                src={`http://localhost:3000/${leaveDetails?.emp_Id?.userId?.profileImage}`}
                alt=""
                className="w-100 h-40 rounded-full"
              />
            </div>
            <div className="flex flex-col p-2 gap-2">
              <p className="text-lg font-semibold ">
                Employee ID: {leaveDetails?.emp_Id?.employeeId}
              </p>
              <p className="text-lg font-semibold ">
                Name: {leaveDetails?.emp_Id?.userId?.name}
              </p>
              <p className="text-lg font-semibold">
                Department: {leaveDetails?.emp_Id?.department?.dep_name}
              </p>
              <p className="text-lg font-semibold">
                Leave Type: {leaveDetails?.leaveType}
              </p>
              <p className="text-lg font-semibold">
                Comments: {leaveDetails?.comments}
              </p>
              <p className="text-lg font-semibold">
                Start Date: {new Date(leaveDetails?.startDate).toDateString()}
              </p>
              <p className="text-lg font-semibold">
                End Date: {new Date(leaveDetails?.endDate).toDateString()}
              </p>
              <p className="text-lg flex flex-row gap-2 font-semibold">
                <p>
                  {leaveDetails?.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leaveDetails?.status === "Pending" ? (
                  <div className="flex flex-row  gap-3 text-white">
                    <button
                      onClick={() =>
                        handleLeaveActions(leaveDetails._id, "Approved")
                      }
                      className="bg-green-600 px-5 py-1 rounded-md ">
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleLeaveActions(leaveDetails._id, "Rejected")
                      }
                      className="bg-red-600 px-5 py-1 rounded-md ">
                      Reject
                    </button>
                  </div>
                ) : (
                  leaveDetails?.status
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
