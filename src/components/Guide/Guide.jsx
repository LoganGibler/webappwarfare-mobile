import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGuideByID } from "../../api";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "./guide.css";

const Guide = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState([]);
  const steps = guide.steps;
  const [guidePFP, setGuidePFP] = useState([]);
  const [stepImages, setStepImages] = useState([]);
  let list = [];
  let stepCounter = 0;
  let counter = 0;
  const stepImagesRef = ref(storage, "/images/" + id);
  const guidePFPRef = ref(storage, "/guidepfp/");

  async function fetchGuide() {
    const fetchedGuide = await getGuideByID(id);
    setGuide(fetchedGuide.blog);
  }

  useEffect(() => {
    fetchGuide();
    listAll(stepImagesRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setStepImages((prev) => [...prev, url]);
        });
      });
    });
    listAll(guidePFPRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setGuidePFP((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="waw__guide-main-container">
      <div className="waw__guide-div">
        <div className="waw__guide-header-div">
          <div>
            {guidePFP &&
              guidePFP.map((image) => {
                let guideImageId = image.split("_");
                guideImageId = guideImageId[1];
                list.push(guideImageId);
                if (guide._id === guideImageId) {
                  return (
                    <div className="waw__guidepage-pfp-div">
                      <img src={image}></img>
                    </div>
                  );
                }
              })}
            {!list.includes(guide._id) && (
              <div className="waw__guidepage-pfp-div">
                <img src="https://www.ecpi.edu/sites/default/files/whitehat.png" />
              </div>
            )}
          </div>
          <div className="waw__guidepage_details-div">
            <h3 className="gradient_text">{guide.vmtitle}</h3>
            <p>
              Created On: <a>{guide.date}</a>
            </p>
            <p>
              Posted By: <a>{guide.author}</a>
            </p>
            <p>
              Hosted By: <a>{guide.hostedby}</a>
            </p>
            <p>
              Rating: <a>{guide.difficulty}</a>
            </p>
          </div>
          <div className="waw__guidepage_details-mobile-div">
            <h3 className="gradient_text">{guide.vmtitle}</h3>
            <p>{guide.date}</p>
            <p>{guide.author}</p>
            <p>{guide.hostedby}</p>
            <p>{guide.difficulty}</p>
          </div>
        </div>

        <div className="waw__guidepage-description-div">
          <p>{guide.description}</p>
        </div>

        {/* loop over steps here */}
        {steps ? (
          steps.map((step) => {
            // console.log(step);
            if (step.step === null) {
              stepCounter += 1;
              var stepCounterIndex = stepCounter - 1;
              return;
            }
            counter = counter + 1;
            var index = counter - 1;
            var stepCounterIndex = stepCounter;
            stepCounter += 1;
            return (
              <div className="waw__guidepage-step-div">
                <div className="waw__stepcounter-div">
                  <p>Step {counter}:</p>
                </div>
                <div className="waw__step-div">
                  <p>
                    <a>Step {counter}: </a>
                    {step.step}
                  </p>
                </div>
                {stepImages.length
                  ? stepImages.map((image) => {
                      let imageIndex = image.split("?")[0];
                      imageIndex = imageIndex[imageIndex.length - 1];

                      if (imageIndex === stepCounterIndex.toString()) {
                        return (
                          <div className="waw__step-image-div">
                            <img src={image}></img>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
            );
          })
        ) : (
          <div>{/* <h4>This Guide has no steps yet.</h4> */}</div>
        )}
      </div>
    </div>
  );
};

export default Guide;
