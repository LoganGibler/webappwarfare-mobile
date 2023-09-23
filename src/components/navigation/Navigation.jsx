import React, { useState, useEffect } from "react";
import "./navigation.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../pics/logoBlue.png";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../indexedDB";
import { getLogStatus } from "../../auth";

const Navigation = () => {
  const { user } = db;
  const allItems = useLiveQuery(() => user.toArray(), []);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    if (allItems) {
      var userQuery = allItems[0];
      setActiveUser(userQuery);
    }
  }, []);

  const loggedIn = getLogStatus();

  const Menu = () => {
    return (
      <>
        <p>
          <a href="/Home" className="waw__navigation-home">
            Home
          </a>
        </p>
        <p>
          <a href="/Guides">Guides</a>
        </p>
        {loggedIn && (
          <p>
            <a href="/Profile">Profile</a>
          </p>
        )}
        {loggedIn && (
          <p>
            <a href="/createGuide">CreateGuide</a>
          </p>
        )}
      </>
    );
  };

  return (
    <div className="waw__navigation-div">
      <div className="waw__navigation-links">
        <div className="waw__navigation-links-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="waw__navigation-links-container">
          <Menu />
        </div>
      </div>
      {!loggedIn ? (
        <div className="waw__navigation-sign">
          <p
            onClick={() => {
              navigate("/Login");
            }}
          >
            Sign in
          </p>
          <button
            onClick={() => {
              navigate("/Register");
            }}
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className="waw__navigation-sign">
          <button
            onClick={async () => {
              window.localStorage.removeItem("isLoggedIn");
              alert("Successfully Logged out.");
              localStorage.clear();
              navigate("/Login");
            }}
          >
            Sign Out
          </button>
        </div>
      )}
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
          <div className="scale-up-center   waw__navigation-menu-container">
            <div className="waw__navigation-menu-links-container">
              <Menu />
              {!loggedIn ? (
                <div className="waw__navigation-menu-container-links-sign">
                  <p
                    onClick={() => {
                      navigate("/Login");
                    }}
                  >
                    Sign In
                  </p>
                  <button
                    className="waw__signupbutton"
                    onClick={() => {
                      navigate("/Register");
                    }}
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="waw__navigation-menu-container-links-sign">
                  <button
                    className="waw__signupbutton"
                    onClick={async () => {
                      window.localStorage.removeItem("isLoggedIn");
                      alert("Successfully Logged out.");
                      localStorage.clear();
                      navigate("/Login");
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
