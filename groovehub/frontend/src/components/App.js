import React, { lazy }  from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    useRouteMatch,
  } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage"
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";
import history from './history';
import RoomSettingsPage from "./RoomSettingsPage";

// App component

const App = () => {
    return (
        <div className= "center">
        <Router history={history}>
          <Switch>
            <Route exact path="/"  > <HomePage/></Route>
            <Route path="/join-room/"  component={JoinRoomPage}></Route>
            <Route path="/create-room/"  component={CreateRoomPage}  ></Route>
            <Route exact path="/room/:roomCode/" render = {(<div>Hello00000000</div>)}> </Route>
            <Route path="/room/:roomCode/settings/" component={RoomSettingsPage} ></Route>
          </Switch>
      </Router>
        </div>
    )
}

export default App

