import React from "react";
import MainOption from "./MainOption";
import ImageUpload from "./ImageUpload";
import "./style/Main.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Hero from "./Hero";

export default function Main() {
  const user = useSelector(selectUser);
  return (
    <div className="main">
      <Hero></Hero>
      <div className="top-info">
        <h1>{` Welcome ${user.displayName}`}</h1>
      </div>
      <MainOption></MainOption>
      <ImageUpload></ImageUpload>
    </div>
  );
}
