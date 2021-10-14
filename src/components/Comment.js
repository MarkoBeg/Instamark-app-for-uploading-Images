import React from "react";
import "./style/Comment.css";

export default function Comment({ id, name, comment, timestamp }) {
  return (
    <div className="messages">
      <h5>{name}</h5>
      <span>{new Date(timestamp?.toDate()).toLocaleTimeString()}</span>
      <p>{comment}</p>
    </div>
  );
}
