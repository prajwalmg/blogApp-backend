import React from "react";
import { Link } from "react-router-dom";

// import postImage from "../../assets/pexels-pixabay-267355.jpg";
import "./post.css";

export default function Post({ post }) {
  const PF = "https://blog-app-mg.herokuapp.com/images/"; // To acces the images folder
  return (
    <div className="post">
      {post.postPhoto && (
        <img className="postImg" src={PF + post.postPhoto} alt="#postImage" />
      )}

      <div className="postInfo">
        <div className="postCategories">
          {post.categories.map((cat) => (
            <span className="postCategory">{cat}</span>
          ))}
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}
