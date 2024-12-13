import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { salaryColumn } from "../../../utils/EmployeeHelper";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";

export const Salary = () => {
  const { id } = useParams();
  const [salaryData, setSalarydata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.salary.map((sal) => ({
            sno: sno++,
            ...sal,
          }));
          setLoading(false);
          setSalarydata(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return loading ? (
    <LoadingOverlay isLoading={loading} />
  ) : (
    <div className="mt-4">
      <h1 className="font-bold text-center text-2xl flex gap-2 justify-content flex-col">
        <span
          style={{ textShadow: "2px 2px 2px gray" }}
          className="text-red-400 text-3xl"></span>
        Salary History
      </h1>
      <div>
        <DataTable columns={salaryColumn} data={salaryData} />
      </div>
    </div>
  );
};
