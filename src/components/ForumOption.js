import React, { useState } from "react";
import { useSelector } from "react-redux";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { selectUser } from "../features/userSlice";
import "./style/ForumOption.css";
import { db } from "../firebase";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function ForumOption({ id, forumMessage, timestamp }) {
  const user = useSelector(selectUser);
  const [editMessage, setEditMessage] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);

  const handleRemove = () => {
    db.collection("forum").doc(id).delete();
  };

  const edit = (e) => {
    e.preventDefault();
    db.collection("forum").doc(id).set(
      {
        message: editMessage,
      },
      { merge: true }
    );
    setEditMessage("");
  };

  const handleDisplay = () => {
    setEditDisplay(true);
  };
  return (
    <div className="forumOption">
      <div className="forumOption-header">
        <h5>{user.displayName || user.displayName[0]}</h5>
        <div className="time">
          <h5>{new Date(timestamp?.toDate()).toLocaleTimeString()}</h5>
          <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
        </div>
      </div>
      <div className="forumOption-posts">
        <form>
          <p>{forumMessage}</p>
          {editDisplay ? (
            <input
              type="text"
              placeholder="Edit your forum message"
              className="edit-input"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
            />
          ) : (
            <ModeEditOutlineOutlinedIcon
              style={{ color: "var(--light-green-color)", cursor: "pointer" }}
              onClick={handleDisplay}
            ></ModeEditOutlineOutlinedIcon>
          )}

          <button onClick={edit} style={{ display: "none" }}></button>

          <DeleteForeverOutlinedIcon
            style={{ color: "var(--red-color)", cursor: "pointer" }}
            onClick={handleRemove}
          ></DeleteForeverOutlinedIcon>
        </form>
      </div>
    </div>
  );
}
