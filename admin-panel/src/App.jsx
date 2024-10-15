import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home/Index";
import LoginComponent from "./Pages/Login";
import PrivateRoute from "./Components/ProtectedRoute";
import HotelsTable from "./Pages/HotelTable";
import RoomsTable from "./Pages/RoomsTable";
// import { createContext, useState } from "react";
// export const CloseForm = createContext(null);

const App = () => {
  // const [closeForm, setCloseForm] = useState(false);
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
          {/* <CloseForm.Provider
            value={{ closeForm, setCloseForm }}
          ></CloseForm.Provider> */}
          <Route
            path="/hotels"
            element={
              <PrivateRoute>
                <HotelsTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <PrivateRoute>
                <RoomsTable />
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
