import React, { useState, useEffect } from "react";
import "./style/MainOption.css";
import { db } from "../firebase";
import Image from "./Image";

export default function MainOption() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="mainOption">
     
      <div className="bottom-img">
        {posts.map(({ id, data: { caption, imageUrl, timestamp } }) => {
          return (
            <Image
              postId={id}
              key={id}
              timestamp={timestamp}
              url={imageUrl}
              caption={caption}
            ></Image>
          );
        })}
      </div>
    </div>
  );
}
