import React from "react";
import { useAuth } from "../../Context/Auth_context";

export const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between h-12 items-center font-bold py-7 text-white p-6 bg-HeavyDark_green">
      <p>Welcome, {user.name}</p>
      <button
        className="px-4 py-1 bg-light_green text-black rounded-md"
        onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};
