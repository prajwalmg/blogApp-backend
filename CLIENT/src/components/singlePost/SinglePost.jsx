import React, { useContext, useEffect, useState } from "react";
import {axiosInstance} from "../../config";
import { useLocation, Link } from "react-router-dom";

// import postImage from "../../assets/pexels-pixabay-267355.jpg";
import "./singlePost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const loc = useLocation(); // Gets the path of the webpage
  const postId = loc.pathname.split("/")[2]; // Splits the pathname and gets the postId from it
  // console.log(postId);

  const { user } = useContext(Context);
  const PF = "https://blog-app-mg.herokuapp.com/images/";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [post, setPost] = useState({});
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosInstance.get("/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.description);
      // console.log(res);
      setPost(res.data);
    };
    getPosts();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description: desc,
      });
      // window.location.reload();
      setUpdateMode(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.postPhoto && (
          <img
            src={PF + post.postPhoto}
            alt="#postImage"
            className="singlePostImg"
          />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitle singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <strong> {post.username}</strong>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.updatedAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescription singlePostDescriptionInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDescription">{desc}</p>
        )}
        {updateMode && (
          <div className="buttonWrapper">
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="singlePostButton singlePostCancelButton"
              onClick={() => setUpdateMode(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
