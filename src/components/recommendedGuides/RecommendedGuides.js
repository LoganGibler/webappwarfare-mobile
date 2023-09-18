import React, { useState, useEffect } from "react";
import "./recommendedGuides.css";
import { getFeaturedGuides } from "../../api";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase.js";
let imageListReg = ref(storage, "/guidepfp/");

const RecommendedGuides = () => {
  const [guides, setGuides] = useState([]);
  const [guideImgs, setGuideImgs] = useState([]);
  const navigate = useNavigate();
  const list = [];

  async function fetchFeaturedGuides() {
    const fetchedGuides = await getFeaturedGuides();
    console.log(fetchedGuides);
    setGuides(fetchedGuides.featuredGuides);
  }

  useEffect(() => {
    fetchFeaturedGuides();
    listAll(imageListReg).then((res) => {
      // console.log("this is res.items", res.items);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setGuideImgs((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="waw__rec-guides">
      <div className="waw__rec-guides-container">
        <h2 className="gradient_text">Recommended Guides</h2>
        <div className="waw__rec-guides-main-div">
          {guides.length
            ? guides.map((guide) => {
                return (
                  <div className="waw__rec-guide" key={guide._id}>
                    {guideImgs &&
                      guideImgs.map((image) => {
                        const imageGuideID = image.split("_")[1];
                        list.push(imageGuideID);
                        if (guide._id === imageGuideID) {
                          return (
                            <div className="waw__rec-guides-img-div">
                              <img src={image} alt="defaultIMG"></img>
                            </div>
                          );
                        }
                      })}
                    {!list.includes(guide._id) && (
                      <div className="waw__rec-guides-img-div">
                        <img
                          src="https://www.ecpi.edu/sites/default/files/whitehat.png"
                          alt="defaultIMG"
                        ></img>
                      </div>
                    )}
                    <div className="waw__rec-guides-details">
                      <h4>{guide.vmtitle}</h4>
                      <p>{guide.difficulty}</p>
                      <p>{guide.hostedby}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default RecommendedGuides;
