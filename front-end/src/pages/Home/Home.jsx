import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import HotelsCard from "../../components/Hotels/HotelsCard";
import Footer from "../../components/Footer/Footer"; 
import { useState } from "react";

const Home = () => {
    const [activeItem, setActiveItem] = useState("stays");

  return (
    <>
      <div className="home  ">
        <Navbar />
       
        <Header activeItem={activeItem} setActiveItem={setActiveItem} />
        {activeItem == "stays" &&
          <HotelsCard />
          }
          <Footer />             
      </div>
    </>
  );
};

export default Home;
