import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import logo from "../../pics/pngegg (1).png";
import {
  getGuidesByUsername,
  getPublishedUnapprovedGuides,
  getUserByID,
} from "../../api/index.js";

const Profile = () => {
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("user"));
  const userID = JSON.parse(localStorage.getItem("key"));
  let [user, setUser] = useState("");
  let [guides, setGuides] = useState([]);
  let [unapprovedGuides, setUnapprovedGuides] = useState([]);

  async function fetchUser(userID) {
    let user = await getUserByID(userID);
    setUser(user.user[0]);
  }

  async function fetchGuides() {
    const foundGuides = await getGuidesByUsername(userID);
    console.log(foundGuides);
    setGuides(foundGuides);
  }

  async function fetchUnapprovedGuides() {
    const foundUnapprovedGuides = await getPublishedUnapprovedGuides();
    setUnapprovedGuides(foundUnapprovedGuides);
  }

  useEffect(() => {
    fetchUser(userID);
    fetchGuides(user);
    fetchUnapprovedGuides();
  }, []);

  return (
    <div className="waw__profile">
      <div className="waw__profile-content">
        {guides.length ? (
          guides.map((guide) => {
            <h1 className="waw__profile-guides-header gradient_text">
              Hey User. Here are your created Guides.
            </h1>;
            console.log("guides:", guide);
            return <div>{guide.title}</div>;
          })
        ) : (
          <div className="waw__profile-noguides-header">
            <div className="waw__profile-header-div">
              <h1 className="gradient_text">
                This is where you can view and edit your created guides.
              </h1>
            </div>
            <div className="waw__profile-p-div">
              <p>
                Any guides you create will not be public until you publish it.
              </p>
              <p>
                <a
                  onClick={() => {
                    navigate("/createGuide");
                  }}
                >
                  Click here to create a guide. &nbsp; →
                </a>
              </p>
            </div>

            <div className="waw__profile-img-div">
              <img src={logo}></img>
            </div>
          </div>
        )}
      </div>
      <div>{guides.length ? guides.map((guide) => {}) : null}</div>
    </div>
  );
};

export default Profile;
