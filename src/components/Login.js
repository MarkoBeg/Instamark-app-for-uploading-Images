import React, { useState } from "react";
import { auth } from "../firebase";
import "./style/Login.css";
import logo from "../images/logo_size.jpg";
import login from "../features/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const Login = (e) => {
    e.preventDefault();
    if (
      !password.length ||
      password.length <= 3 ||
      !email.length ||
      email.length < 4 ||
      !name.length ||
      name.length <= 3
    ) {
      return "Form is invalid";
    }
    auth.signInWithEmailAndPassword(email, password).then((user) => {
      dispatch(
        login({
          email: user.user.email,
          uid: user.user.uid,
          displayName: user.user.displayName,
          profilePic: user.user.photoURL,
        })
      );
    });
  };

  const Register = (e) => {
    e.preventDefault();
    if (!name.length || !email.length || !password.length) {
      return alert("Form is incorrect");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: user.user.email,
                uid: user.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error || alert("Something went wrong")));
  };

  return (
    <div className="login">
      <img src={logo} alt="logo"></img>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Profile Picture by URL optional"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        ></input>
        <button onClick={Login}>Login</button>
        <span onClick={Register} className="register">
          Register
        </span>
      </form>
    </div>
  );
}
