import React, { useState } from "react";
import "./style/Hero.css";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Hero() {
  const [backImage, setBackImage] = useState(false);
  const user = useSelector(selectUser);

  const handleClick = () => {
    setBackImage(!backImage);
  };
  return (
    <div className="hero">
      <div
        className={`hero-profiles ${backImage ? "back-image" : ""}`}
        onClick={handleClick}
      >
        <img src={image4} alt="me"></img>
        <ControlPointOutlinedIcon className="hero-plus"></ControlPointOutlinedIcon>
        <h6>{user.displayName || user.email}</h6>
      </div>
      <div className="hero-profiles">
        <img src={image3} alt="me"></img>
        <h6>Story</h6>
      </div>
      <div className="hero-profiles">
        <img src={image2} alt="me"></img>
        <h6>Lena</h6>
      </div>
      <div className="hero-profiles">
        <img src={image1} alt="me"></img>
        <h6>World</h6>
      </div>
    </div>
  );
}
