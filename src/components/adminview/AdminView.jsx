import React, { useState, useEffect } from "react";
import "./adminview.css";
import {
  approveGuide,
  getPublishedUnapprovedGuides,
  rejectGuide,
} from "../../api";
import { useNavigate } from "react-router";

const AdminView = () => {
  const navigate = useNavigate();
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
        <div className="waw__admin-header">
          <h1>Admin Menu / Review</h1>
        </div>
        {guides.length ? (
          guides.map((guide) => {
            return (
              <div className="waw__admin-guide">
                <h3
                  className="waw__admin-vmtitle"
                  onClick={(e) => {
                    if (e.target == e.currentTarget) {
                      navigate(`/guide/${guide._id}`);
                    }
                  }}
                >
                  {guide.vmtitle}
                </h3>
                <p
                  className="waw__admin-difficulty"
                  onClick={(e) => {
                    if (e.target == e.currentTarget) {
                      navigate(`/guide/${guide._id}`);
                    }
                  }}
                >
                  {guide.difficulty}
                </p>
                <p
                  className="waw__admin-author"
                  onClick={(e) => {
                    if (e.target == e.currentTarget) {
                      navigate(`/guide/${guide._id}`);
                    }
                  }}
                >
                  {guide.author}
                </p>
                <p className="waw__admin-date">{guide.date}</p>
                <button
                  className="waw__admin-approve"
                  onClick={async (e) => {
                    if (e.target == e.currentTarget) {
                      await approveGuide(guide._id);
                      window.location.reload();
                    }
                  }}
                >
                  Approve
                </button>

                <button
                  className="waw__admin-reject"
                  onClick={async (e) => {
                    if (e.target == e.currentTarget) {
                      await rejectGuide(guide._id);
                      window.location.reload();
                    }
                  }}
                >
                  Reject
                </button>
              </div>
            );
          })
        ) : (
          <div className="waw__admin-noguides-label">
            <h3>No guides for review.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
