import "./Footer.css";

const Footer = () => {
  return (
    <>
    <br/>
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
     </footer>
    </>
  );
};

export default Footer;
