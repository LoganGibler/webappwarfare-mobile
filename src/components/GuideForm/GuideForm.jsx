import React, { useState } from "react";
import "./guideform.css";
import logo from "../../pics/logoBlue.png";
import { getUser } from "../../auth";
import { createGuide } from "../../api";
import { useNavigate } from "react-router-dom";

const GuideForm = () => {
  let navigate = useNavigate();
  let author = getUser();
  let [vmtitle, setvmtitle] = useState("");
  let [hostedby, setHostedBy] = useState("");
  let [description, setDescription] = useState("");
  let [difficulty, setDifficulty] = useState("");

  function getCategoryOption() {
    let selectElement = document.querySelector("#dropdown_difficulty");
    let output = selectElement.options[selectElement.selectedIndex].value;
    return output;
  }

  return (
    <div className="waw__guideform">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            console.log("vmtitle:", vmtitle);
            console.log(" hostedby:", hostedby);
            console.log("description :", description);
            console.log(" difficulty:", difficulty);
            console.log(" author:", author);
            const data = await createGuide(
              vmtitle,
              hostedby,
              description,
              difficulty,
              author
            );
            if (data) {
              alert("Guide created successfully.");
              navigate("/Profile");
            } else {
              alert("Guide creation failed. Please try again.");
            }
          } catch (error) {
            throw error;
          }
        }}
      >
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
            onChange={(e) => {
              setvmtitle(e.target.value);
            }}
          ></input>
          <label className="waw__guideform-hostname-label">Hostname</label>
          <div className="waw__guideform-host-diff">
            <input
              placeholder="Where can this VM be found?"
              className="waw__guideform-host"
              onChange={(e) => {
                setHostedBy(e.target.value);
              }}
            ></input>
            <select
              name="difficulty"
              id="dropdown_difficulty"
              defaultValue={difficulty}
              onChange={async (e) => {
                let selected_difficulty1 = await getCategoryOption();
                setDifficulty(selected_difficulty1);
              }}
            >
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
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="*Optional* - Please provide a brief description of this box. No Spoilers!"
          ></textarea>
        </div>
        <div className="waw__guideform-createguide-button">
          <button>Create Guide</button>
        </div>
      </form>
    </div>
  );
};

export default GuideForm;
