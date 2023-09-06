import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGuideByID } from "../../api";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase.js";
import "./guide.css";

const Guide = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState([]);
  const steps = guide.steps;
  console.log("This is steps: ", steps);
  async function fetchGuide() {
    const fetchedGuide = await getGuideByID(id);
    console.log(fetchedGuide.blog);
    setGuide(fetchedGuide.blog);
  }

  useEffect(() => {
    fetchGuide();
  }, []);

  return (
    <div className="waw__guide-main-container">
      <div className="waw__guide-div">
        <div className="waw__guide-header-div">
          <div>
            <img src={"https://www.ecpi.edu/sites/default/files/whitehat.png"} alt="guide-pfp" className="waw__guidepage-img"></img>
          </div>
          <div className="waw__guidepage_details-div">
            <h3 className="gradient_text">{guide.vmtitle}</h3>
            <p>{guide.difficulty}</p>
            <p>{guide.hostedby}</p>
          </div>
        </div>

        <div>
          <p>{guide.description}</p>
        </div>

        {/* loop over steps here */}
        {steps ? (
          steps.map((step) => {
            console.log(step);
            return (
              <div>
                <p>{step.step}</p>
              </div>
            );
          })
        ) : (
          <div>
            <h4>This Guide has no steps yet.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guide;
