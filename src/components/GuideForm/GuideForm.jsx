import React, { useState } from "react";
import "./guideform.css";
import logo from "../../pics/logoBlue.png";

const GuideForm = () => {
  let [vmtitle, setvmtitle] = useState("");
  let [hostedby, setHostedBy] = useState("");
  let [description, setDescription] = useState("");
  let [difficulty, setDifficulty] = useState("");

  return (
    <div className="waw__guideform">
      <form>
        <div>
          <div>
            <h4 className="">WebAppWarfare</h4>
            <p>Guide Form</p>
          </div>
          <img src={logo}></img>
        </div>
        <div className="waw__createguide-inputs">
          <label>VM Title</label>
          <input
            placeholder="Enter VM name..."
            className="waw__guideform-vmtitle"
          ></input>
          <label className="waw__guideform-hostname-label">Hostname</label>
          <div className="waw__guideform-host-diff">
            <input
              placeholder="Where can this VM be found?"
              className="waw__guideform-host"
            ></input>
            <select name="difficulty" defaultValue={difficulty}>
              <option disabled={true} value="">
                Difficulty
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Insane">Insane</option>
            </select>
          </div>
        </div>
        <div className="waw__guideform-desc-label-div">
          <label className="waw__guideform-desc-label">VM Description</label>
        </div>

        <div className="waw__guideform-textarea">
          <textarea placeholder="*Optional* - Please provide a brief description of this box. No Spoilers!"></textarea>
        </div>
        <div className="waw__guideform-createguide-button">
          <button>Create Guide</button>
        </div>
      </form>
    </div>
  );
};

export default GuideForm;
