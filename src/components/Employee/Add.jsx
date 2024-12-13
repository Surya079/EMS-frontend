import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormdata] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (name === "dob") {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: new Date(value).toLocaleDateString(),
      }));
    } else {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Our form data is contain file som we need to convert formdat object like bellow
    const formDataObject = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObject.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/add",
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
        toast.success("Employee Added Successfully");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server Error");
      }
    }
  };

  // Get department
  useEffect(() => {
    const getDepartments = async () => {
      const departmentLists = await fetchDepartments();
      setDepartments(departmentLists);
    };
    getDepartments();
  }, []);
  return (
    <div className="max-w-4xl mx-auto mt-10 rounded-md shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 ">
        {/* Name */}
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Name* :
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Email* :
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Employee ID* :
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter employee id"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Date of Birth* :
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Gender* :
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Marital Status* :
            </label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
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
              type="text"
              name="department"
              placeholder="Enter name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
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
              placeholder="Enter salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Passowrd* :
            </label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Role* :
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Upload Image* :
            </label>
            <input
              type="file"
              name="image"
              placeholder="Photo"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className=" mt-5 mb-2 text-white py-2 px-4 rounded-md  bg-HeavyDark_green">
          Add Employee
        </button>
      </form>
    </div>
  );
};
