import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home/Index";
import LoginComponent from "./Components/Login";
import PrivateRoute from "./Components/ProtectedRoute";
import HotelsTable from "./Pages/HotelTable";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="admin-login" element={<LoginComponent />} />
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotels"
            element={
              <PrivateRoute>
                <HotelsTable />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
