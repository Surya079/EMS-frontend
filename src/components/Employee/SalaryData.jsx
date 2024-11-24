import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { salaryColumn } from "../../utils/EmployeeHelper";

export const SalaryData = () => {
  const { id } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [salaryData, setSalarydata] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salary/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.salaryData.map((sal) => ({
            sno: sno++,
            ...sal,
          }));

          setSalarydata(data);
          setEmployeeName(response.data.salaryData[0].employeeName);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return salaryData ? (
    <div className="mt-4">
      <h1 className="font-bold text-center text-2xl flex gap-2 justify-content flex-col">
        <span
          style={{ textShadow: "2px 2px 2px gray" }}
          className="text-red-400 text-3xl">
          {employeeName}
        </span>
        Salary History
      </h1>
      <div>
        <DataTable columns={salaryColumn} data={salaryData} />
      </div>
    </div>
  ) : (
    <div> Loading...</div>
  );
};
