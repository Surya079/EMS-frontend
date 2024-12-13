import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../Context/Auth_context";
import { toast } from "react-toastify";

export const Settings = () => {
  const { user } = useAuth();
  const [passwordFormValues, setPasswordFormValues] = React.useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordFormValues.newPassword !== passwordFormValues.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const handleChangePassword = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/settings/change-password`,
          passwordFormValues,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
          toast.success("Password Changed Successfully");
          setPasswordFormValues({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Server Error");
        }
      }
    };
    handleChangePassword();
  };
  return (
    <div className="p-4 flex flex-col  items-center">
      <h2 className="py-3 font-bold text-2xl mb-3">Change Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-white p-6 w-[400px] gap-3">
          <div className="flex flex-col  justify-between">
            <label htmlFor="oldPassword">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              required
              placeholder="Old Password"
              className="border h-10 pl-2 outline-none"
              value={passwordFormValues.oldPassword}
              onChange={handleChange}
              name="oldPassword"
            />
          </div>
          <div className="flex flex-col  justify-between">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              className="border h-10 pl-2 outline-none"
              value={passwordFormValues.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
          </div>
          <div className="flex flex-col  justify-between">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              required
              className="border h-10 pl-2 outline-none"
              placeholder="Confirm Password"
              value={passwordFormValues.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <div className="flex justify-center ">
            <button
              className="w-full bg-HeavyDark_green text-white py-2 px-6 rounded-md"
              type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
