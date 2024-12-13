import React from "react";
import { useNavigate } from "react-router-dom";

export const adminColumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "60px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "90px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
    style: {
      textAlign: "left",
    },
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
    width: "120px",
    style: {
      textAlign: "left",
    },
  },
  {
    name: "Department",
    selector: (row) => (
      <div
        title={row.department}
        className="overflow-hidden cursor-help text-ellipsis whitespace-nowrap">
        {row.department}
      </div>
    ),
    sortable: true,
    width: "150px",
    style: {
      textAlign: "left",
    },
  },
  {
    name: "Days",
    selector: (row) => row.days,
    sortable: true,
    width: "75px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "comments",
    selector: (row) => (
      <div
        title={row.comments}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "help",
        }}>
        {row.comments}
      </div>
    ),
    sortable: true,
    width: "150px",
    style: {
      textAlign: "left",
    },
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "100px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: false,
    width: "100px",
    style: {
      textAlign: "center",
    },
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leave/${id}`);
  };
  return (
    <button
      className="px-4 py-1 bg-HeavyDark_green rounded text-white"
      onClick={() => handleView(Id)}>
      View
    </button>
  );
};
