import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../Context/Auth_context";

export const EmployeeSummary = () => {
  const { user } = useAuth();
  return (
    <div className="rounded flex bg-white m-3 border ">
      <div
        className={`flex text-3xl justify-center items-center bg-Dark-violet px-4 text-white`}>
        <FaUser />
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">Hi !, {user.name} </p>
        <p className="text-xl font-bold">Welcome to your dashboard</p>
      </div>
    </div>
  );
};
