import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const loginAdmin = (token) => {
    localStorage.setItem("authAdminToken", token);
    setIsAdminLoggedIn(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("authAdminToken");
    setIsAdminLoggedIn(false);
  };

  // Check if the token exists in localStorage (when the app loads)
  useEffect(() => {
    const tokenAdmin = localStorage.getItem("authAdminToken");

    if (tokenAdmin) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginAdmin,
        logoutAdmin,
        isAdminLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
