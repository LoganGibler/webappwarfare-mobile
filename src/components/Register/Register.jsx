import React, { useState, useEffect } from "react";
import "./register.css";
import logo from "../../pics/logoBlue.png";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../../api";
import { hashPassword } from "../../flask_api";
import { storeID, storeToken, storeUser, logStatus } from "../../auth";

const Register = () => {
  const [passRequirements, setPassRequirements] = useState(false);
  const [userRequirements, setUserRequirements] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div className="waw__register">
      <form
        className="waw__register-form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (username.length < 4) {
            alert("Please use at least 5 characters in username.");
            return;
          } else if (password.length < 6) {
            alert("Please use at least 7 characters for your password.");
            return;
          } else if (!/\p{Lu}/u.test(password)) {
            alert("Please include a capital letter in your password.");
            return;
          } else if (!/\d/.test(password)) {
            alert("Please include one number in your password.");
            return;
          } else {
            let hashedPassword = await hashPassword(password);
            hashedPassword = hashedPassword.data.hashed_pass;
            console.log(hashedPassword);
            console.log(username, hashedPassword);
            let user = await createUser(username, hashedPassword);
            // console.log("this is user", user);
            if (user.data.token) {
              let loggedInUser = await loginUser(username, hashedPassword);
              //   console.log(loggedInUser);
              let userData = loggedInUser.data.user;
              logStatus(true);
              storeUser(userData.username);
              storeToken(loggedInUser.data.token);
              storeID(userData._id);
              setUsername("");
              setPassword("");
              navigate("/Guides");
            }
          }
        }}
      >
        <div>
          <h4>WebAppWarfare</h4>
          <img src={logo}></img>
        </div>
        <label>Username</label>
        <input
          value={username}
          placeholder="Username"
          onClick={() => {
            setPassRequirements(false);
            setUserRequirements(true);
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        {userRequirements === true && (
          <div className="waw__register-userdetails-div">
            <li>Please use at least 5 characters.</li>
          </div>
        )}
        <label>Password</label>
        <input
          value={password}
          placeholder="Password"
          type="password"
          onClick={() => {
            setUserRequirements(false);
            setPassRequirements(true);
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        {passRequirements === true && (
          <div className="waw__register-passdetails-div">
            <li>Please include at least 7 characters</li>
            <li>Capital Letter</li>
            <li>Numerical Character</li>
          </div>
        )}
        <button> Sign Up </button>

        <u
          onClick={() => {
            navigate("/Login");
          }}
        >
          Already have an account?
        </u>
      </form>
    </div>
  );
};

export default Register;
