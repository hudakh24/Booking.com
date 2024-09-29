import "./AdminHome.css"
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";


const AdminHome = () => {
  //  const [isHotelsOpen, setIsHotelsOpen] = useState(false);
  // const [isRoomsOpen, setIsRoomsOpen] = useState(false);

  return (
    <div className="pageContainer">
      <Navbar /> 
      <div className="midContainer">
        <SideBar/>
        </div>
      <Footer /> 
    </div>
  );
};

export default AdminHome;
