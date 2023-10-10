import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile2.css";
import logo from "../../pics/pngegg (1).png";
import {
  getGuidesByUsername,
  getPublishedUnapprovedGuides,
  getUserByID,
  getUserByUsername,
} from "../../api/index.js";
import { storage } from "../../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getID, getUser } from "../../auth";
import AdminView from "../adminview/AdminView";

let imageListReg = ref(storage, "/guidepfp/");

const Profile = () => {
  const navigate = useNavigate();
  let [guides, setGuides] = useState([]);
  let [unapprovedGuides, setUnapprovedGuides] = useState([]);
  let [imageDirectoryList, setImageDirectoryList] = useState([]);
  let [userData, setUserData] = useState([]);
  let list = [];
  let activeUser = getUser();
  let key = getID();

  async function fetchGuides() {
    const foundGuides = await getGuidesByUsername(activeUser);
    // console.log(foundGuides.blogs);
    setGuides(foundGuides.blogs);
  }

  async function fetchUnapprovedGuides() {
    const foundUnapprovedGuides = await getPublishedUnapprovedGuides();
    setUnapprovedGuides(foundUnapprovedGuides);
  }

  async function fetchUserData() {
    const userData1 = await getUserByID(key);
    const user1 = await getUserByUsername(userData1.user);
    setUserData(user1.data.user);
  }

  useEffect(() => {
    fetchUserData();
    fetchGuides(activeUser);
    fetchUnapprovedGuides();
    listAll(imageListReg).then((res) => {
      console.log("this is res.items", res.items);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageDirectoryList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="waw__profile">
      <div className="waw__profile-container">
        <div className="waw__profile-header">
          <h1>~/ Profile / Created Guides</h1>
        </div>
        {guides.length ? (
          guides.map((guide) => {
            return (
              <div
                className="waw__profile-guide"
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
                        <img
                          src={image}
                          alt="img"
                          className="waw__profile-guide-img"
                        ></img>
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
                <h3 className="waw__profile-vmtitle">{guide.vmtitle}</h3>
                <p className="waw__profile-difficulty">{guide.difficulty}</p>
                <p className="waw__profile-author">{guide.hostedby}</p>
                <p className="waw__profile-date">{guide.date}</p>
                {guide.published === "false" ? (
                  <p className="waw__profile-published">Private</p>
                ) : (
                  <p className="waw__profile-published">Public</p>
                )}
              </div>
            );
          })
        ) : (
          <div classname="waw__profile-noguides">
            <div className="waw__profile-p-noguides-div">
              <p>This is where you can view and edit your created guides.</p>
              <p>
                Any guides you create will not be public until you publish it.
              </p>
              <button
                onClick={() => {
                  navigate("/createGuide");
                }}
              >
                Click here to create a guide. &nbsp; →
              </button>
            </div>

            <div className="waw__profile-img-noguides-div-logo">
              <img src={logo} className="waw__profile_logo"></img>
            </div>
          </div>
        )}
        {userData.admin && <AdminView />}
      </div>
    </div>
  );
};

export default Profile;
