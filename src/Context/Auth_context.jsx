import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const userContext = createContext();

export const Auth_context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Bearer token sent to the server
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        alert(error.response.data.error)
        console.error("Error during token verification:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};
export const useAuth = () => useContext(userContext);

