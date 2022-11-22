import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../../config";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);

  const { isFetching, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">LOGIN</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={usernameRef}
        />
        <label>Password</label>
        <input className="loginInput" type="password" ref={passwordRef} />
        <button className="loginButton" type="submit" disabled={isFetching}>
          LOGIN
        </button>
        {error && <span className="errorText">Something went wrong!</span>}
      </form>
      <button className="loginRegisterButton loginButton">
        <Link className="link" to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );
}
