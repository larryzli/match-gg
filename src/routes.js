import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BracketViewer from "./components/BracketViewer/BracketViewer";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";

const Routes = props => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/brackets" component={BracketViewer} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
};

const mapStateToProps = state => {
    return state;
};
export default withRouter(connect(mapStateToProps)(Routes));
