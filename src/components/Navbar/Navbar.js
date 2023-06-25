import React  from "react";
import axios from "axios";
import logo from "./../../Assets/logo2.png";
import "./Navbar.css";

const Navbar = () => {

  return (
    <>
      <nav className="align-items-center">
        <div className="nav-logo d-flex align-items-center">
          <img src={logo} alt="logo" />
          <ul>
          <li>
            <a href="/">Home</a> {/* Link-Komponente für den Home-Link */}
          </li>
          <li>
            <a href="/shopping-list">ShoppingList</a> {/* Link-Komponente für den ShoppingList-Link */}
          </li>
        </ul>
    
        </div>
        <div className="logo-buttons">
        <a href="/register">
          <button className="nav-btn signup">SignUp</button>
          </a>
          <a href="/logIn">
          <button className="nav-btn login">LogIn</button>
          </a>
          <button className="nav-btn login">LogOut</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
