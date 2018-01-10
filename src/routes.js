import React from "react";
import { Switch, Route } from "react-router-dom";

import BracketViewer from "./components/BracketViewer/BracketViewer";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/brackets/" component={BracketViewer} />
        <Route path="/login" component={Login} />
    </Switch>
);
