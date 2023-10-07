import React, { useState, useEffect } from "react";
import "./guides1.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getAllPublishedGuides, getGuidesBySearch } from "../../api/index.js";
import { FeaturedGuides, RecommendedGuides } from "../../components";
let imageListReg = ref(storage, "/guidepfp/");

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [imageDirectoryList, setImageDirectoryList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  let list = [];

  async function fetchGuides() {
    const data = await getAllPublishedGuides();
    setGuides(data.allPublishedBlogs);
  }

  useEffect(() => {
    fetchGuides();
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
    <div className="waw__guides">
      {/* {console.log("guides", guides)} */}

      <div className="waw__allguides-wrapper">
        <RecommendedGuides />
        <div className="waw__guides-searchbar-div">
          <div>
            <h4>~/ Guides / AllGuides</h4>
            <input
              placeholder="Search Guides"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button
              onClick={async () => {
                let sortedGuides = [];
                if (search.length > 0) {
                  let foundGuides = await getGuidesBySearch(search);
                  foundGuides = foundGuides.allFoundGuides[0];
                  // setGuides(foundGuides.allFoundGuides);
                  if (foundGuides !== null) {
                    foundGuides.map((guide) => {
                      // console.log("guidesfrom search:", guide);
                      sortedGuides.push(guide);
                    });
                  }
                  setGuides(sortedGuides);
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="waw__guides-mainguide-div">
          {guides.length
            ? guides.map((guide) => {
                // console.log("guide", guide);
                return (
                  <div
                    className="waw__guide"
                    key={guide._id}
                    onClick={() => {
                      navigate(`/guide/${guide._id}`);
                    }}
                  >
                    <div className="waw__guide-image-div">
                      {imageDirectoryList.length &&
                        imageDirectoryList.map((image) => {
                          let guide_id = image.split("_")[1];
                          list.push(guide_id);
                          if (guide_id === guide._id) {
                            return (
                              <div className="waw__guides-image-div">
                                <img src={image} />
                              </div>
                            );
                          }
                        })}
                    </div>
                    {!list.includes(guide._id) && (
                      <div className="waw__guides-image-div">
                        <img src="https://www.ecpi.edu/sites/default/files/whitehat.png" />
                      </div>
                    )}
                    <div className="waw__guides-details-div" key={guide._id}>
                      <h3>{guide.vmtitle}</h3>
                      <p className="waw__guides-details-diff">
                        {guide.difficulty}
                      </p>
                      <p className="waw__guides-details-host">
                        {guide.hostedby}
                      </p>
                      <p className="waw__guides-details-author">
                        {guide.author}
                      </p>
                      <p className="waw__guides-details-date">{guide.date}</p>
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

export default Guides;
