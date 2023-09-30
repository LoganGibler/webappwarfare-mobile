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
    const navLink = JSON.parse(localStorage.getItem("nav"));
    return (
      <>
        {navLink === "Home" ? (
          <p id="home-p">
            <a
              className="waw__navigation-home active-nav-link"
              onClick={() => {
                window.localStorage.setItem("nav", JSON.stringify("Home"));
                navigate("/Home");
              }}
            >
              Home
            </a>
          </p>
        ) : (
          <p id="home-p">
            <a
              href="/Home"
              className="waw__navigation-home"
              onClick={() => {
                window.localStorage.setItem("nav", JSON.stringify("Home"));
                navigate("/Home");
              }}
            >
              Home
            </a>
          </p>
        )}

        {navLink === "Guides" ? (
          <p>
            <a
              className="active-nav-link"
              onClick={() => {
                window.localStorage.setItem("nav", JSON.stringify("Guides"));
                navigate("/Guides");
                setToggleMenu(false);
              }}
            >
              Guides
            </a>
          </p>
        ) : (
          <p>
            <a
              onClick={() => {
                window.localStorage.setItem("nav", JSON.stringify("Guides"));
                navigate("/Guides");
                setToggleMenu(false);
              }}
            >
              Guides
            </a>
          </p>
        )}

        {loggedIn && (
          <div>
            {navLink === "Profile" ? (
              <p>
                <a
                  className="active-nav-link"
                  onClick={() => {
                    window.localStorage.setItem(
                      "nav",
                      JSON.stringify("Profile")
                    );
                    navigate("/Profile");
                    setToggleMenu(false);
                  }}
                >
                  Profile
                </a>
              </p>
            ) : (
              <p>
                <a
                  onClick={() => {
                    window.localStorage.setItem(
                      "nav",
                      JSON.stringify("Profile")
                    );
                    navigate("/Profile");
                    setToggleMenu(false);
                  }}
                >
                  Profile
                </a>
              </p>
            )}
          </div>
        )}

        {loggedIn && (
          <div>
            {navLink === "CreateGuide" ? (
              <p>
                <a
                  className="active-nav-link"
                  onClick={() => {
                    window.localStorage.setItem(
                      "nav",
                      JSON.stringify("CreateGuide")
                    );
                    navigate("/createGuide");
                    setToggleMenu(false);
                  }}
                >
                  CreateGuide
                </a>
              </p>
            ) : (
              <p>
                <a
                  onClick={() => {
                    window.localStorage.setItem(
                      "nav",
                      JSON.stringify("CreateGuide")
                    );
                    navigate("/createGuide");
                    setToggleMenu(false);
                  }}
                >
                  CreateGuide
                </a>
              </p>
            )}
          </div>
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
              setToggleMenu(false);
            }}
          >
            Sign in
          </p>
          <button
            onClick={() => {
              navigate("/Register");
              setToggleMenu(false);
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
                      setToggleMenu(false);
                    }}
                  >
                    Sign In
                  </p>
                  <button
                    className="waw__signupbutton"
                    onClick={() => {
                      navigate("/Register");
                      setToggleMenu(false);
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
