import React, { useState } from "react";
import { useAuth } from "../../../Context/Auth_context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddLeave = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState({
    userId: user._id,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setLeaves((prevLeave) => ({
        ...prevLeave,
        [name]: new Date(value).toLocaleDateString(),
      }));
    }
    setLeaves((prevLeave) => ({ ...prevLeave, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/leave/add",
        leaves,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Leave Requested Successfully");
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server Error");
      }
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center ">
        Request New Leave
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="leaveType"
            className="text-sm font-medium mb-1 text-gray-700">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={leaves.leaveType}
            onChange={handleChange}
            className="border p-2 rounded">
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Medical Leave">Medical Leave</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="startDate"
              className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="mt-1 w-full block rounded-md p-2 border border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="mt-1 w-full block rounded-md p-2 border border-gray-300"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="comments"
            className="text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            name="comments"
            onChange={handleChange}
            placeholder="Enter your comments"
            className="mt-1 w-full block rounded-md p-2 border border-gray-300"
            rows={"4"}></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-HeavyDark_green text-white font-bold py-2 px-4 rounded">
          Request new Leave
        </button>
      </form>
    </div>
  );
};
