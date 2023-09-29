import React, { useState, useEffect } from "react";
import "./adminview.css";
import { getPublishedUnapprovedGuides } from "../../api";

const AdminView = () => {
  const [guides, setGuides] = useState([]);

  async function fetchPublishedUnapprovedGuides() {
    const data = await getPublishedUnapprovedGuides();
    // console.log(data.guides);
    setGuides(data.guides);
  }

  useEffect(() => {
    fetchPublishedUnapprovedGuides();
  }, []);

  return (
    <div className="waw__admin-view">
      <div className="waw__admin-guide-container">
        {guides.length
          ? guides.map((guide) => {
              return (
                <div className="waw__admin-guide">
                  <h3 className="waw__admin-vmtitle">{guide.vmtitle}</h3>
                  <p className="waw__admin-difficulty">{guide.difficulty}</p>
                  <p className="waw__admin-author">{guide.author}</p>
                  <p className="waw__admin-date">{guide.date}</p>
                  <button className="waw__admin-approve">Approve</button>

                  <button className="waw__admin-reject">Reject</button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default AdminView;
