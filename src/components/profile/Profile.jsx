import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile1.css";
import logo from "../../pics/pngegg (1).png";
import {
  getGuidesByUsername,
  getPublishedUnapprovedGuides,
  getUserByID,
} from "../../api/index.js";
import { storage } from "../../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
let imageListReg = ref(storage, "/guidepfp/");

const Profile = () => {
  const navigate = useNavigate();
  const activeUser = JSON.parse(localStorage.getItem("user"));
  const userID = JSON.parse(localStorage.getItem("key"));
  let [user, setUser] = useState("");
  let [guides, setGuides] = useState([]);
  let [unapprovedGuides, setUnapprovedGuides] = useState([]);
  let [imageDirectoryList, setImageDirectoryList] = useState([]);
  let list = [];

  async function fetchUser(userID) {
    let user = await getUserByID(userID);
    setUser(user.user[0]);
  }

  async function fetchGuides() {
    const foundGuides = await getGuidesByUsername(activeUser);
    // console.log(foundGuides.blogs);
    setGuides(foundGuides.blogs);
  }

  async function fetchUnapprovedGuides() {
    const foundUnapprovedGuides = await getPublishedUnapprovedGuides();
    setUnapprovedGuides(foundUnapprovedGuides);
  }

  useEffect(() => {
    fetchUser(userID);
    fetchGuides(user);
    fetchUnapprovedGuides();
    listAll(imageListReg).then((res) => {
      // console.log("this is res.items", res.items);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageDirectoryList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="waw__profile">
      <div className="waw__profile-content">
        {guides.length ? (
          <div className="waw__profile-guides-header">
            <h1 className="gradient_text waw__profile-guides-header-title">
              Created Guides
            </h1>
            <div className="waw__profile-outside-container">
              {guides.map((guide) => {
                return (
                  <div
                    className="waw__profile-guide-div"
                    key={guide._id}
                    onClick={() => {
                      navigate(`/editguide/${guide._id}`);
                    }}
                  >
                    {imageDirectoryList.length &&
                      imageDirectoryList.map((image) => {
                        let guide_id = image.split("_")[1];
                        list.push(guide_id);
                        if (guide_id === guide._id) {
                          return (
                            <div className="waw__profile-image-div">
                              <img
                                src={image}
                                alt="img"
                                className="waw__profile-guide-img"
                              ></img>
                            </div>
                          );
                        }
                      })}
                    {!list.includes(guide._id) && (
                      <div className="waw__profile-image-div">
                        <img
                          src="https://www.ecpi.edu/sites/default/files/whitehat.png"
                          className="waw__profile-guide-img"
                          alt="img"
                        ></img>
                      </div>
                    )}
                    <div className="waw__profile-guide-info">
                      <h4>{guide.vmtitle}</h4>
                      {/* <p className="waw__profile-guide-description">
                      {guide.description}
                    </p> */}
                      <div>
                        <p className="waw__profile-difficulty">
                          {guide.difficulty}
                        </p>
                        <p className="waw__profile-guide-info-author">
                          {guide.hostedby}
                        </p>
                        <p className="waw__profile-guide-info-date">
                          {guide.date}
                        </p>
                        {guide.published === "false" ? (
                          <p className="waw__profile-guide-info-published">
                            Private
                          </p>
                        ) : (
                          <p className="waw__profile-guide-info-published">
                            Public
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="waw__profile-noguides-header">
            <div className="waw__profile-header-noguides-div">
              <h1 className="gradient_text">Welcome to your profile page.</h1>
            </div>
            <div className="waw__profile-p-noguides-div">
              <p>This is where you can view and edit your created guides.</p>
              <p>
                Any guides you create will not be public until you publish it.
              </p>
              {/* <p>
                <a
                  onClick={() => {
                    navigate("/createGuide");
                  }}
                >
                  Click here to create a guide. &nbsp; →
                </a>
              </p> */}
              <button href="/createGuide">Click here to create a guide. &nbsp; →</button>
            </div>

            <div className="waw__profile-img-noguides-div-logo">
              <img src={logo} className="waw__profile_logo"></img>
            </div>
          </div>
        )}
      </div>

      {/* <div>{guides.length ? guides.map((guide) => {}) : null}</div> */}
    </div>
  );
};

export default Profile;
