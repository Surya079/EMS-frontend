import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddDepartment = () => {
  const [Department, SetDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetDepartment({ ...Department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Department);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/department/add",
        Department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.succes) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.succes) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center ">
        Add New Department
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter Dep Name"
            value={Department.dep_name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={Department.description}
            onChange={handleChange}
            className="mt-1 w-full block rounded-md p-2 border border-gray-300"
            rows={"4"}></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-HeavyDark_green text-white font-bold py-2 px-4 rounded">
          Add Department
        </button>
      </form>
    </div>
  );
};
