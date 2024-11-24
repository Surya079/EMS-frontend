import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export const Leaves = () => {
  return (
    <>
      <div className="p-2 ">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Leaves details</h3>
        </div>
        <div className="flex justify-between items-center p-2">
          <input
            type="text"
            placeholder="Search by Dep Name"
            className="px-4 py-0.5"
          />
          <Link
            to={"/employee-dashboard/add-leave"}
            className="px-4 py-1 bg-HeavyDark_green rounded text-white">
            Request New Leave
          </Link>
        </div>
      </div>
      <DataTable />
    </>
  );
};
