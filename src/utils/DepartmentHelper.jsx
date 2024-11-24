import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentActionButtons = ({ _id }) => {
  const navigate = useNavigate();

  const deleteDepartment = async () => {
    const confirmByUser = window.confirm("Are you sure you want to delete?");
    try {
      if (confirmByUser) {
        await axios.delete(`http://localhost:3000/api/department/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-green-400"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-400"
        onClick={() => deleteDepartment()}>
        Delete
      </button>
    </div>
  );
};
