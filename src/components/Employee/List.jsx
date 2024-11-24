import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, EmployeeActions } from "../../utils/EmployeeHelper";
import axios from "axios";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

function List() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId?.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                className="rounded-full w-10"
                src={`http://localhost:3000/${emp.userId?.profileImage}`}
              />
            ),
            action: <EmployeeActions Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filterEmployees = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(records);
  };

  return (
    <>
      {isLoading ? (
        <LoadingOverlay isLoading={isLoading} />
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center p-2">
            <input
              type="text"
              placeholder="Search by employee"
              className="px-4 py-0.5 border"
              onChange={filterEmployees}
            />
            <Link
              to={"/admin-dashboard/add-employee"}
              className="bg-HeavyDark_green rounded px-4 py-1 text-white">
              Add New Employee
            </Link>
          </div>

          <div>
            <DataTable columns={columns} data={filteredEmployees} />
          </div>
        </div>
      )}
    </>
  );
}

export default List;
