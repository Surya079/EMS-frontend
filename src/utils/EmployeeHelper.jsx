import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// employee table columns
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "60px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "140px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "230px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

// Salary table rows
export const salaryColumn = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Name",
    selector: (row) => row.employeeName,
  },
  {
    name: "Basic Salary",
    selector: (row) => row.basicSalary,
  },
  {
    name: "Allowances",
    selector: (row) => row.allowances,
  },
  {
    name: "Deductions",
    selector: (row) => row.deductions,
  },
  {
    name: "Net Salary",
    selector: (row) => row.netSalary,
  },
  {
    name: "Pay Date",
    selector: (row) => row.payDate,
  },
];

// fetch departments for dropdown add employee list
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return departments;
};
// fetch employees for  add Salary
export const fetchEmployee = async (id) => {
  let employees;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return employees;
};

// employee action buttons
export const EmployeeActions = ({ Id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-blue-500"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}>
        View
      </button>
      <button
        className="px-3 py-1 bg-green-600"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}>
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-400"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}>
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600"
        onClick={() => navigate(`/admin-dashboard/employee/leave/${Id}`)}>
        Leave
      </button>
    </div>
  );
};
