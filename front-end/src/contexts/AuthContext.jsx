import { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Function to log in
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const loginAdmin = (token) => {
    localStorage.setItem("authAdminToken", token);
    setIsAdminLoggedIn(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("authAdminToken");
    setIsAdminLoggedIn(false);
  };

  // Check if the token exists in localStorage (when the app loads)
  useEffect(() => {
     const token = localStorage.getItem("authToken");
     const tokenAdmin = localStorage.getItem("authAdminToken");

    if (token) {
      setIsLoggedIn(true);
    }
    if (tokenAdmin) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loginAdmin, logoutAdmin, isAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
