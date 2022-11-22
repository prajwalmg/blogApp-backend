import React, { useContext, useState } from "react";
import axiosInstance from "../../config";

import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { Context } from "../../context/Context";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://blog-app-mg.herokuapp.com/images/";

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(`${user.username}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [password, setPassword] = useState(`${user.password}`);
  const [bio, setBio] = useState(`${user.bio}`);

  const [success, setSuccess] = useState(false);

  // console.log(URL.createObjectURL(file));
  const handleSubmit = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      bio,
    };
    if (file) {
      const data = new FormData(); // Creating new FormData variable to store the filename and the file
      const filename = Date.now() + file.name; // Custom file name
      data.append("name", filename); // Adding the filename and file to the FormData
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axiosInstance.post("/upload", data); // Uploading the FormData created to the DB via the API
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      // window.location.reload();
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${user._id}`, {
        data: { userId: user._id },
      });
      // window.location.replace("/login");
      dispatch({ type: "DELETE_USER" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsProfileIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Bio</label>
          <textarea
            maxLength="50"
            cols="30"
            rows="5"
            className="userBio"
            placeholder={bio}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span className="updatedMessageText">
              Profile updated successfully!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
