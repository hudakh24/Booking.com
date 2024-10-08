import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";


// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log in
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  // Check if the token exists in localStorage (when the app loads)
  useEffect(() => {
     const token = localStorage.getItem("authToken");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
