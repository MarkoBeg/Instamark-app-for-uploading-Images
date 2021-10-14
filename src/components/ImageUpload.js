import React, { useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "./style/ImageUpload.css";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const types = ["image/jpeg", "image/png"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImage(selected);
      setError("");
    } else {
      setImage(null);
      setError("Something went wrong please select a valid type png or jpg");
    }
    console.log(selected);
  };

  const handleUpload = () => {
    const uploadTest = storage.ref(`images/${image.name}`).put(image);
    uploadTest.on(
      "state_change",
      (snapshot) => {
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
            });
          });
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="imageUpload">
      <img src={image} alt="" />
      <p>{error}</p>
      <progress className="imageUpload-progress" value={progress}></progress>
      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" className="file" onChange={handleChange} />
      <button onClick={handleUpload} className="btn-upload">
        Upload
      </button>
    </div>
  );
}
