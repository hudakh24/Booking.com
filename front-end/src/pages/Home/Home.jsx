import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import HotelsCard from "../../components/Hotels/HotelsCard";
import Footer from "../../components/Footer/Footer"; 
const Home = () => {
  return (
    <>
      <div className="home">
        <Navbar />
        <Header />
        <HotelsCard />
        <Footer/> 
      </div>
    </>
  );
};

export default Home;
