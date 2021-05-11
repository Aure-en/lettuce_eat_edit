import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./routes/entry/Login";
import SignUp from "./routes/entry/SignUp";
import Main from "./routes/Main";
import Posts from "./routes/posts/Posts";
import Categories from "./routes/Categories";
import Ingredients from "./routes/Ingredients";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={Main} />
        <PrivateRoute path="/ingredients" component={Ingredients} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/categories" component={Categories} />
      </Switch>
    </Router>
  );
}

export default App;
