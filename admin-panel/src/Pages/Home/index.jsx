import Navbar from "../../Components/Navbar";
import SideBar from "../../Components/Sidebar";
import "./index.css";

const AdminHome = () => {
  //  const [isHotelsOpen, setIsHotelsOpen] = useState(false);
  // const [isRoomsOpen, setIsRoomsOpen] = useState(false);

  return (
    <div className="pageContainer">
      <Navbar />
      <div className="midContainer">
        <SideBar />
      </div>
    </div>
  );
};

export default AdminHome;
