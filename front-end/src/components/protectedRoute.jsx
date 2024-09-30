import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = (props) => {
    const {isAdminLoggedIn} = useContext(AuthContext);
  return (
    <>{isAdminLoggedIn ? props.children : <Navigate to={"/admin"} />}</>
  );
};

export default PrivateRoute;
