import React, { useState } from "react";
import "./style/Header.css";
import logo from "../images/logo_size.jpg";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";

export default function Header() {
  const history = useHistory();
  const [color, setColor] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const changeColor = () => {
    setColor(!color);
  };
  const Logout = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="logo">
        <img onClick={() => history.push("/")} src={logo} alt="logo-name"></img>
      </div>
      <div className="header-info">
        <Avatar
          onClick={Logout}
          src={user.profilePic || user.displayName[0]}
        ></Avatar>
        <h4 onClick={() => history.push("/")}>Home</h4>
        <h4 onClick={() => history.push("/messages")}>Messages</h4>
        <FavoriteBorderOutlinedIcon
          className={color ? "red" : "transparent"}
          onClick={changeColor}
        ></FavoriteBorderOutlinedIcon>
      </div>
    </div>
  );
}
