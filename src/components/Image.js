import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import "./style/Image.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Comment from "./Comment";
import firebase from "firebase";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import InfoIcon from "@mui/icons-material/Info";

export default function Image({ postId, timestamp, url, caption }) {
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState("");
  const [input, setInput] = useState("");
  const [imageComments, setImageComments] = useState([]);
  const user = useSelector(selectUser);

  const Like = () => {
    setCount(count + 1);
  };

  const comments = () => {
    setComment(!comment);
  };

  const sendComments = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("imageComments").add({
      comment: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("imageComments")
      .onSnapshot((snapshot) => {
        setImageComments(
          snapshot.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        );
      });
  }, [postId]);

  return (
    <div className="image-section">
      <div className="person-info">
        <Avatar
          src={user.profilePic || user.displayName[0]}
          alt="user"
        ></Avatar>
        <h5>{user.displayName || user.email[0]}</h5>
      </div>
      <div className="image-time">
        <span>{`Posted at: ${new Date(
          timestamp?.toDate()
        ).toLocaleTimeString()}`}</span>
      </div>
      <div className="image-info">
        <img src={url} alt="uploaded"></img>
      </div>
      <div className="icons">
        <button
          style={{ cursor: "pointer" }}
          disabled={count === 1}
          onClick={Like}
        >
          <span className={count ? "count-red" : "like"}>
            <FavoriteBorderIcon
              className={count ? "red" : ""}
            ></FavoriteBorderIcon>
            {count}
          </span>
        </button>
        <SearchIcon></SearchIcon>
        <CommentOutlinedIcon
          onClick={comments}
          style={{ cursor: "pointer" }}
        ></CommentOutlinedIcon>
        <SendIcon></SendIcon>
      </div>
      <div className="caption-section">
        <InfoIcon></InfoIcon>
        <p className="caption-text">{caption}</p>
      </div>
      <div className={comment ? "comments" : "comments-section"}>
        <div className="comments-messages">
          <h5>{`Hi ${user.displayName}`}</h5>
          <form>
            <input
              type="text"
              placeholder="post a comment"
              className="comment-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendComments}></button>
          </form>
        </div>
        <div className="messages-section">
          {imageComments.map(({ id, data: { comment, timestamp } }) => {
            return (
              <Comment
                id={id}
                key={id}
                comment={comment}
                name={user.displayName}
                timestamp={timestamp}
              ></Comment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
