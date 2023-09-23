import React, { useState } from "react";
import "./login.css";
import logo from "../../pics/logoBlue.png";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { hashPassword } from "../../flask_api";
import { storeToken, storeUser, logStatus, storeID } from "../../auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="waw__login">
      <form
        className="waw__login-form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!username || !password) {
            alert("Please fill out username and password.");
            return;
          }
          let hashedPassword = await hashPassword(password);
          hashedPassword = hashedPassword.data.hashed_pass;
          //   console.log(hashedPassword);
          const user = await loginUser(username, hashedPassword);

          const user_info = user.data.user;
          if (!user_info) {
            setUsername("");
            setPassword("");
            alert("Username or Password was incorrect. Please try again.");
          } else {
            storeID(user_info._id);
            storeUser(user_info.username);
            logStatus(true);
            setUsername("");
            setPassword("");
            navigate("/Profile");
          }
        }}
      >
        <div>
          <h4>WebAppWarfare</h4>
          <img src={logo}></img>
        </div>
        <label>Username</label>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button> Sign In </button>
        <u
          onClick={() => {
            navigate("/Register");
          }}
        >
          Don't have an account? Sign up Here
        </u>
      </form>
    </div>
  );
};

export default Login;
