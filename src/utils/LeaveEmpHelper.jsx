export const empColumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
  },
  {
    name: "End Date",
    selector: (row) => row.endDate,
  },
  {
    name: "comments",
    selector: (row) => row.comments,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];
