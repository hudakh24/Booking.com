// import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  // const navigate = useNavigate(); // This hook is used to navigate programmatically

  // const handleLoginClick = () => {
  //   navigate("/login"); // This will navigate to the /login route
  // };

  return (
    <>
      <div className="home">
        <Navbar />
        <Header />
        <Footer/>
      </div>
      {/* <button onClick={handleLoginClick}>Login</button> */}
    </>
  );
};

export default Home;
