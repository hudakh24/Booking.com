import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home/index";
import LoginComponent from "./Components/Login";
import PrivateRoute from "./Components/ProtectedRoute";
import HotelsTable from "./Pages/HotelTable";
import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
import UpdateForm from "./Forms/UpdateForm";
import RoomsTable from "./Pages/RoomsTable";
import Layout from "./Components/Layout";
import AddForm from "./Forms/AddForm";

const App = () => {
  const { isAdminLoggedIn } = useContext(AuthContext);

  return isAdminLoggedIn ? (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/hotels"
          element={
            <PrivateRoute>
              <Layout>
                <HotelsTable />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/home/hotels/update-hotel/:hotelId"
          element={
            <PrivateRoute>
              <Layout>
                <UpdateForm isHotel={true} />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/home/add-hotel"
          element={
            <PrivateRoute>
              <Layout>
                <AddForm isHotel={true} />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/home/rooms"
          element={
            <PrivateRoute>
              <Layout>
                <RoomsTable />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/home/rooms/update-room/:roomId"
          element={
            <PrivateRoute>
              <Layout>
                <UpdateForm isHotel={false} />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  ) : (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
    </Routes>
  );
};

export default App;
