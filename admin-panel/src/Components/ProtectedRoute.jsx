import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import PropTypes from "prop-types";

const PrivateRoute = (props) => {
  const { isAdminLoggedIn } = useContext(AuthContext);
  return <>{isAdminLoggedIn ? props.children : <Navigate to={"/"} />}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
