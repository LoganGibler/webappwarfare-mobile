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
  let list = [];

  async function fetchFeaturedGuides() {
    const fetchedGuides = await getFeaturedGuides();
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
      {console.log(guideImgs)}
      <div className="waw__rec-guides-container">
        {guides &&
          guides.map((guide) => {
            {
              guideImgs &&
                guideImgs.map((image) => {
                  let spliced_image_id = image.split("_")[1];
                  {/* console.log(image); */}
                  if (guide._id === spliced_image_id) {
                    return (
                        <div>
                            <img src={image}></img>
                        </div>
                    )
                  }
                });
            }
          })}
      </div>
    </div>
  );
};

export default RecommendedGuides;
