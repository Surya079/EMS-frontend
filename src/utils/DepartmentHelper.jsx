import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
    const confirmByUser = window.confirm(
      "Are you sure! Do you want to delete?"
    );
    try {
      if (confirmByUser) {
        await axios.delete(`http://localhost:3000/api/department/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      toast.success("Department Deleted Successfully");
      navigate(0);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server Error");
      }
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
