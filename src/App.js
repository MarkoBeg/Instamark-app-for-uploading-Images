import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";

import Main from "./components/Main";
import Login from "./components/Login";
import { login, selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";
import Forum from "./components/Forum";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            profilePic: user.photoURL,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <>
      {!user ? (
        <Login></Login>
      ) : (
        <div className="app">
          <Router>
            <Header></Header>
            <Switch>
              {/*Messages gonna be added extra */}
              <div className="home-body">
                <Route path="/">
                  <Forum></Forum>
                  <Main></Main>
                </Route>
              </div>
            </Switch>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
