import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

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
                Authorization: `Bearer ${token}`, // The "Bearer" keyword is used to indicate that the token is a Bearer token. This is a security feature to prevent malicious actors from using the token without knowing it is a Bearer token.
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

        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
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
