import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../../config";

import "./sidebar.css";
// import profileImg from "../../assets/mgpic.jpg";
import { Context } from "../../context/Context";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);
  const PF = "https://blog-app-mg.herokuapp.com/images/";

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="sidebarProfileImg" src={PF + user.profilePic} alt="#profilepic" />
        <p>
          {user.bio}
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((cat) => (
            <Link className="link" to={`/?category=${cat.name}`}>
              <li className="sidebarListItem">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
