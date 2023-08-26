import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="waw__header section_padding" id="home">
      <div className="waw__header-content">
        <h1 className="gradient_text">Let's Practice Hacking Today.</h1>
        <p> Any and all Guides posted are purely for the purpose of learning.
         All techniques learned here will only be used ethically. 
         Any unethical actions can result in fines or even prison time. 
         All hosts compromised on this site are meant for practice only, and 
         the Authors have been granted permission to attack these Vulnerable boxes.</p>
         <p>For experienced pentesters, view posted guides here:</p>
         <p className="waw__header-button-p">View Guides</p>
         <p>For noobies, learn how to setup your own home lab here:</p>
         <p className="waw__header-button-p">Create a Home Lab</p>
      </div>
    </div>
  );
};

export default Header;
