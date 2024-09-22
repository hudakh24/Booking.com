import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Hotels from "../../components/Hotels/Hotels";
import Footer from "../../components/Footer/Footer"; 
import SidebarSearch from "../../components/SideBarSearch/SideBarSearch";
const Home = () => {
  return (
    <>
      <div className="home">
        <Navbar />
        <Header />
        <Hotels />
        <Footer /> 
      </div>
    </>
  );
};

export default Home;
