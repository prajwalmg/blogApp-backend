import React, { useState } from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../../config";

import "./register.css";

export default function Register() {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the page from refreshing when clicked on submit
    setError("");
    try {
      const res = await axiosInstance.post("/auth/register", {
        username: userInput.username,
        email: userInput.email,
        password: userInput.password
      })

      // If any data is present ,i.e., on successfull registration window.location.replace redirects to the login page
      res.data && window.location.replace("/login"); 
    } catch (err) {
      setError(err.response.data);
      // console.log(err.response.data);
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">REGISTER</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(event) => {
            setUserInput({ ...userInput, username: event.target.value });
          }}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          autoComplete="none"
          onChange={(event) => {
            setUserInput({ ...userInput, email: event.target.value });
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          onChange={(event) => {
            setUserInput({ ...userInput, password: event.target.value });
          }}
        />
        <button className="registerButton">REGISTER</button>
      </form>
      <button className="registerLoginButton registerButton" type="submit">
        <Link className="link" to="/login">
          LOGIN
        </Link>
      </button>
      {error && <span className="errorText">{error}</span>} {/* Displaying the error message if error exists */}
    </div>
  );
}
