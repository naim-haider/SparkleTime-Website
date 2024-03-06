import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ color: "rgb(172, 166, 166)" }} className="footer bg-dark p-3">
      <h4 className="text-center">All Right Reserved &copy; NH-Techinfo</h4>
      <p className="text-center mt-3">
        <Link style={{ color: "rgb(172, 166, 166)" }} to="/about">
          About
        </Link>
        |
        <Link style={{ color: "rgb(172, 166, 166)" }} to="/contact">
          Contact
        </Link>
        |
        <Link style={{ color: "rgb(172, 166, 166)" }} to="/policy">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
