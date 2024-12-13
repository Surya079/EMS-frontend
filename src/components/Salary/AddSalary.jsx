import React, { useEffect, useState } from "react";
import { fetchDepartments, fetchEmployee } from "../../utils/EmployeeHelper";
import axios from "axios";

import { toast } from "react-toastify";

export const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "payDate") {
      setSalaries((prevSal) => ({
        ...prevSal,
        [name]: new Date(value).toLocaleDateString(),
      }));
    } else {
      setSalaries((prevSal) => ({
        ...prevSal,
        [name]: value,
      }));
    }
  };

  const handleDepartmentChange = async (e) => {
    const employeelists = await fetchEmployee(e.target.value);
    setEmployees(employeelists);
  };

  // Get department
  useEffect(() => {
    const getDepartments = async () => {
      const departmentLists = await fetchDepartments();
      setDepartments(departmentLists);
    };
    getDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salaries,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Salary Added Successfully");
        setSalaries({
          employeeId: null,
          basicSalary: 0,
          allowances: 0,
          deductions: 0,
          payDate: null,
        });
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server Error");
      }
    }
  };

  return departments && employees ? (
    <div className="max-w-4xl mx-auto mt-2 rounded-md shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Salary management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 ">
        {/* Name */}
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Department* :
            </label>
            <select
              type="text"
              name="department"
              placeholder="select department"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleDepartmentChange}
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
              Employees* :
            </label>
            <select
              type="text"
              name="employeeId"
              placeholder="Select employee"
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              onChange={handleChange}
              required>
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Basic Salary* :
            </label>
            <input
              type="number"
              name="basicSalary"
              placeholder="Add basic Salary"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Allowances* :
            </label>
            <input
              type="number"
              name="allowances"
              placeholder="Add allowance"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded "
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Deductions* :
            </label>
            <input
              type="number"
              name="deductions"
              placeholder="Add Deductions"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-medium">
              Pay Date* :
            </label>
            <input
              type="date"
              name="payDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className=" mt-5 mb-2 text-white py-2 px-4 rounded-md  bg-HeavyDark_green">
          Add Salary
        </button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
