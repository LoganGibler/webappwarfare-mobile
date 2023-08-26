import React, { useState, useEffect } from "react";
import "./navigation.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
// import logo here

const Menu = () => {
  return (
    <>
      <p>
        <a href="/Home">Home</a>
      </p>
      <p>
        <a href="/Profile">Profile</a>
      </p>
      <p>
        <a href="/CreateGuide">CreateGuide</a>
      </p>
    </>
  );
};

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="waw__navigation-div">
      <div className="waw__navigation-links">
        <div className="waw__navigation-links-logo">
          <img src={""} alt="logo" />
        </div>
        <div className="waw__navigation-links-container">
          <Menu />
        </div>
      </div>
      <div className="waw__navigation-sign">
        <p>Sign in</p>
        <button>Sign up</button>
      </div>
      <div className="waw_navigation-menu">
        {toggleMenu ? (
          <RiCloseLine
            className="ham-menu"
            color="#fff"
            size={28}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            className="ham-menu"
            color="#fff"
            size={28}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="waw__navigation-menu-container scale-up-center">
            <div className="waw__navigation-menu-links-container">
              <Menu />
              <div className="waw__navigation-menu-container-links-sign">
                <p>Sign in</p>
                <button>Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
