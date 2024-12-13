import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";

export const Edit = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, SetIsError] = useState("");
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
  });

  //   get employee

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee({
            maritalStatus: response.data.employee.maritalStatus,
            designation: response.data.employee.designation,
            department: response.data.employee.department?.dep_name,
            salary: response.data.employee.salary,
          });
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
    if (id) fetchemployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
        toast.success("Employee updated Successfully");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }
    }
  };

  useEffect(() => {
    const fetchDepartmentsAsync = async () => await fetchDepartments();
    fetchDepartmentsAsync().then((departments) => setDepartments(departments));
  }, []);

  return isLoading ? (
    <LoadingOverlay isLoading={isLoading} />
  ) : (
    <div className="max-w-4xl mx-auto  rounded-md shadow-md p-8">
      <h2 className="text-2xl text-center mb-10 font-bold ">Edit Employee</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 ">
        {/* Name */}
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Marital Status* :
            </label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              value={employee.maritalStatus}
              onChange={handleChange}
              required>
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Designation* :
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Enter Designation"
              value={employee.designation}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Department* :
            </label>
            <select
              name="department"
              value={employee.department || ""}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep.dep_name}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Salary* :
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary | ""}
              placeholder="Enter salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className=" mt-5 mb-2 text-white py-2 px-4 rounded-md  bg-HeavyDark_green">
          Edit Employee
        </button>
      </form>
    </div>
  );
};
