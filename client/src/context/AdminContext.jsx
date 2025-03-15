import { createContext, useContext, useEffect, useState } from "react";
import { loginAdmin } from "../services/api";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if(token){
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  },[token])

  useEffect(() => {
    const loadAdmin = async () => {
      if(!token){
        setIsLoading(false);
        setAdmin(null);
        return;
      }
    }

    try {
      setAdmin(true);
    } catch (error) {
      console.error("Error loading admin:", error);
      localStorage.removeItem('adminToken');
      setToken(null);
      setAdmin(null);
      setError('Session expired, please login again')
    } finally{
      setIsLoading(false)
    }
  
    loadAdmin()
  }, [])
  

  const login = async (formData) => {
    try {
      setIsLoading(true);
      const result = await loginAdmin(formData.username, formData.password);
      if(result.success){
        localStorage.setItem('adminToken', result.data.token)
        setToken(result.data.token)
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

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  }

  return (
    <AdminContext.Provider value={{ admin, token, login, logout, isLoading, error }}>{children}</AdminContext.Provider>
  );
};
