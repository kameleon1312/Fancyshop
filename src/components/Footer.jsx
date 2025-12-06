import React from "react";
import "../styles/components/footer.scss";

const Footer = () => {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <div>
          <h4>Toolshop</h4>
          <p>Nowoczesny sklep z narzędziami stworzony jako projekt portfolio.</p>
        </div>
        <div>
          <h5>Kontakt</h5>
          <p>kontakt@toolshop.dev</p>
          <p>+48 123 456 789</p>
        </div>
        <div>
          <h5>Social</h5>
          <p>GitHub · LinkedIn · Dribbble</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Toolshop. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;