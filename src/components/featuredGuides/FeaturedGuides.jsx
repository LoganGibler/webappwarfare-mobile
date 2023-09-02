import React, { useState, useEffect } from "react";
import "./featuredguides.css";
import { getFeaturedGuides } from "../../api";
import { features } from "./Data";

// dont use firebase for imgs here, just hardcode them.
const FeaturedGuides = () => {
  // useaffect request /getFeaturedGuides
  let [current, setCurrent] = useState(0);
  let [guides, setGuides] = useState([]);

  async function fetchFeaturedGuides() {
    const featuredGuides = await getFeaturedGuides();
    setGuides(featuredGuides.featuredGuides);
  }

  useEffect(() => {
    fetchFeaturedGuides();
  }, []);

  return (
    <div className="waw__FG-imageslider-container">
      {console.log(guides)}
      <div>
        <h2>Featured Guides</h2>
      </div>
      <div className="waw__FG-imageslider">
        {features.map((feature, index) => {
          {
            /* console.log("This is index", index); */
          }
          return (
            <div
              key={index}
              className={
                index == current
                  ? "waw__FG-imageslider-card-active"
                  : "waw__FG-imageslider-card"
              }
            >
              <div className="waw__FG-imageslider-card-overlay">
                <div>
                  <img src={feature.image}></img>
                </div>
                {console.log(index)}
                <div className="waw__FG-details-div">
                  <h4>{feature.title}</h4>
                  <p>{feature.difficulty}</p>
                  <p>{feature.hostedby}</p>
                  <div>
                    <p>{feature.author}</p>
                    <p>{feature.date}</p>
                  </div>
                </div>
              </div>
              <div className="waw__FG-arrow-left">&lsaquo;</div>
              <div className="waw__FG-arrow-right">&lsaquo;</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedGuides;
