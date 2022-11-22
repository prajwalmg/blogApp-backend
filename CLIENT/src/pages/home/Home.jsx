import React, { useState, useEffect } from "react";
import {axiosInstance} from "../../config";
import { useLocation } from "react-router-dom";

import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation(); // To get the query
  // console.log(search);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosInstance.get("/posts"+search); // To load the posts based on the username
      // console.log(response);
      setPosts(response.data);
    }
    fetchPosts();
  },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
