import React from "react";
import "./header.css";
import hacker_img from "../../pics/hacker-1-11556285293dsnmjzxigd.png";

const Header = () => {
  return (
    <div className="waw__header" id="home">
      <div className="waw__header-content">
        <h1 className="gradient_text">Let's Practice Hacking Today.</h1>
        <p className="waw__header_subtext">
          Any and all Guides posted are purely for the purpose of learning. All
          techniques learned here will only be used ethically. Any unethical
          actions can result in fines or even prison time. All hosts compromised
          on this site are meant for practice only, and the Authors have been
          granted permission to attack these Vulnerable boxes.
        </p>
        <p className="waw__header_subtext">
          For new cybersecurity geeks out there, learn how to setup your own
          home lab here:
        </p>
        <button className="waw__header-button-p-homelab">
          Create a Home Lab &nbsp; →
        </button>
        <p className="waw__header_subtext">
          For experienced pentesters, jump to guides here:
        </p>
        <button className="waw__header-button-p-viewguides">
          View Guides &nbsp; →
        </button>
      </div>

      <div className="waw__header-image">
        <img src={hacker_img}></img>
      </div>
    </div>
  );
};

export default Header;
