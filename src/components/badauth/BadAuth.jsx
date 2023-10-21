import React from "react";
import { useNavigate } from "react-router";
import "./badauth.css";

const BadAuth = () => {
  let navigate = useNavigate();
  //   localStorage.clear();

  return (
    <div className="waw__bad-auth">
      <div>
        <h2 className="gradient_text">
          Bad Authorization. Please sign back in.
        </h2>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/Login");
          }}
        >
          Go to Sign in &nbsp; →
        </button>
      </div>
    </div>
  );
};

export default BadAuth;
