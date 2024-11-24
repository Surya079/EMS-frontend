import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth_context";

export const Login = () => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        LoginData
      );

      setLoginData({
        email: "",
        password: "",
      });

      if (response.data.success) {
        // console.log(response.data.user);
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.data.user.role === "employee") {
          navigate("/employee-dashboard");
        }
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 1000);
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-Dark-violet from-50% to-water-pink to-50% space-y-6">
      <h2 className=" text-4xl max-[450px]:text-center max-[450px]:p-1  font-poppins text-white ">
        Employee Management System
      </h2>

      <div className="border shadow p-6 w-80 bg-white">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={LoginData.email}
              required
              className="w-full px-3 py-2 border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={LoginData.password}
              className="w-full px-3 py-2 border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center justify-between ">
            <label className="flex flex-row items-center ">
              <input type="checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600 text-">
              Forgot Password?
            </a>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-Dark-violet text-white py-2"
              type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
