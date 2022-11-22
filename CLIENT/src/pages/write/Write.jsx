import React, { useContext, useState } from "react";
import axiosInstance from "../../config";

// import writeImage from "../../assets/pexels-pixabay-267355.jpg";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description: desc,
    };
    if (file) {
      const data = new FormData();                  // Creating new FormData variable to store the filename and the file
      const filename = Date.now() + file.name;      // Custom file name
      data.append("name", filename);                // Adding the filename and file to the FormData
      data.append("file", file);
      newPost.postPhoto = filename;

      try {
        await axiosInstance.post("/upload", data);          // Uploading the FormData created to the DB via the API
      } catch (error) {}
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      
    }
  };
  
  return (
    <div className="write">
    {file && <img src={URL.createObjectURL(file)} alt="img" className="writeImg" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>{" "}
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])}/>
          <input
            type="text"
            placeholder="Title"
            className="writeInput" 
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="writeSubmit">
          Publish
        </button>
      </form>
    </div>
  );
}
