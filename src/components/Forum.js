import React, { useState, useEffect } from "react";
import "./style/Forum.css";
import { db } from "../firebase";
import ForumOption from "./ForumOption";
import firebase from "firebase";

export default function Forum() {
  const [postMessage, setPostMessage] = useState("");
  const [forumMessages, setForumMessages] = useState([]);
  

  useEffect(() => {
    db.collection("forum").onSnapshot((snapshot) => {
      setForumMessages(
        snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }))
      );
    });
  }, []);

  const sendForumMessage = (e) => {
    e.preventDefault();
    db.collection("forum").add({
      message: postMessage,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setPostMessage("");
  };

  return (
    <div className="forum-section">
      <div className="forum-header">
        <h2>Forum</h2>
      </div>
      <div className="forum-input">
        <form>
          <input
            type="text"
            placeholder="Post your message here:"
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
          />
          <button
            className="btn-forum"
            onClick={sendForumMessage}
            disabled={!postMessage}
          >
            Submit
          </button>
        </form>
        <div className="forum-messages">
          {forumMessages.map(({ id, data: { message, timestamp } }) => {
            return (
              <ForumOption
                id={id}
                key={id}
                forumMessage={message}
                timestamp={timestamp}
              ></ForumOption>
            );
          })}
        </div>
      </div>
    </div>
  );
}
