import React , { Component } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    useRouteMatch,
  } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";
  

// App component

const App = () => {
    return (
        <>
        <Router>
          <Switch>
            <Route exact path="/" ><HomePage /></Route>
            <Route path="/join-room"  ><JoinRoomPage /></Route>
            <Route path="/create-room"  ><CreateRoomPage/></Route>
            <Route path="/room/:roomCode" component={Room} ></Route>
          </Switch>
      </Router>
        </>
    )
}

export default App

