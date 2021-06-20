import React  from "react"
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
        <div className= "center">
        <Router>
          <Switch>
            <Route exact path="/"  component={HomePage}> </Route>
            <Route path="/join-room"  component={JoinRoomPage}></Route>
            <Route path="/create-room"  component={CreateRoomPage}  ></Route>
            <Route path="/room/:roomCode" component={Room} ></Route>
          </Switch>
      </Router>
        </div>
    )
}

export default App

