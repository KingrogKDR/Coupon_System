import { createContext, useContext, useState } from "react";
import { loginAdmin } from "../services/api";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);

  const login = async (formData) => {
    try {
      setIsLoading(true);
      const result = await loginAdmin(formData.username, formData.password);
      if(result.success){
        setAdmin(true)
        setError(null);
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (error) {
      console.error("Login Error", error);
      setError(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ admin, login, isLoading, error }}>{children}</AdminContext.Provider>
  );
};
