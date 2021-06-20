import React , { Component } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
  } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
  

// App component

const App = () => {
    return (
        <>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/join-room"  component={JoinRoomPage}></Route>
            <Route path="/create-room" component={CreateRoomPage} ></Route>
          </Switch>
      </Router>
        </>
    )
}

export default App

