import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";

export const Profile = () => {
  const { id } = useParams();
  const [empLoading, setEmpLoading] = useState(false);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployee();
  }, []);
  return (
    <div>
      <div>
        <div className="text-center">
          <h1 className="font-bold py-2 text-3xl">Profile</h1>
        </div>
        {empLoading ? (
          <div>
            <LoadingOverlay isLoading={empLoading} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-white rounded p-4">
            <div>
              <img
                src={`http://localhost:3000/${employee?.userId?.profileImage}`}
                alt=""
                className="w-100 h-40 rounded-full"
              />
            </div>
            <div className="flex flex-col p-2 gap-2">
              <p className="text-lg font-semibold ">
                Employee ID: {employee.employeeId}
              </p>
              <p className="text-lg font-semibold ">
                Name: {employee.userId?.name}
              </p>
              <p className="text-lg font-semibold">
                Department: {employee.department?.dep_name}
              </p>
              <p className="text-lg font-semibold">Gender: {employee.gender}</p>
              <p className="text-lg font-semibold">
                MaritalStatus: {employee.maritalStatus}
              </p>
              <p className="text-lg font-semibold">dob: {employee.dob}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
