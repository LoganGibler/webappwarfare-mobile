import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="waw__footer">
      <div className="waw__footer-header-div">
        <h1 className="waw__footer-header gradient_text">
          Keep it up. Hackers didn't get those skills overnight.
        </h1>
      </div>

      <div className="waw__footer-content">
        <div>
          <a href="https://github.com/LoganGibler">GitHub</a>
          <a href="">LinkedIn</a>
          <a href="">Portfolio</a>
        </div>

        <div>
          <a href="https://en.wikipedia.org/wiki/Hacker_Manifesto">Manifesto</a>
          <a href="https://tryhackme.com/">TryHackMe</a>
          <a href="https://www.hackthebox.com/">HackTheBox</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
