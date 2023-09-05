import React, { useState, useEffect } from "react";
import "./featuredguides.css";
// import { getFeaturedGuides } from "../../api";
import { features } from "./Data";

// dont use firebase for imgs here, just hardcode them.
const FeaturedGuides = () => {
  // useaffect request /getFeaturedGuides
  let [current, setCurrent] = useState(0);
  let [guides, setGuides] = useState([]);

  // async function fetchFeaturedGuides() {
  //   const featuredGuides = await getFeaturedGuides();
  //   setGuides(featuredGuides.featuredGuides);
  // }

  // useEffect(() => {
  //   // fetchFeaturedGuides();
  // }, []);

  const slideRight = () => {
    if (current === 3){
      setCurrent(0)
    } else{
      setCurrent(current + 1)
    }
  }

  const slideLeft = () => {
    if (current === 0){
      setCurrent(3)
    } else{
      setCurrent(current - 1)
    }
  }

  return (
    <div className="waw__FG-imageslider-container">
      {console.log(guides)}
      <div>
        <h2 className="gradient_text">Recommended Guides</h2>
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
                  <h4 className="gradient_text">{feature.title}</h4>
                  <div className="waw__FG-details-host-diff-div">
                    <p>{feature.difficulty}</p>
                    <p className="waw__FG-details-diff">{feature.hostedby}</p>
                  </div>
                  <p className="waw__FG-details-description">
                    {feature.description}
                  </p>
                  <div>
                    <p>Author: {feature.author}</p>
                    <p className="waw__FG-details-date">{feature.date}</p>
                  </div>
                </div>
              </div>
              <div className="waw__FG-arrow-left" onClick={slideLeft}>&lsaquo;</div>
              <div className="waw__FG-arrow-right" onClick={slideRight}>&lsaquo;</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedGuides;
