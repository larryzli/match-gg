import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BracketViewer from "./components/BracketViewer/BracketViewer";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Discover from "./components/Discover/Discover";
import Manage from "./components/Manage/Manage";
import ManageCreateBracket from "./components/ManageCreateBracket/ManageCreateBracket";
import ManageViewBracket from "./components/ManageViewBracket/ManageViewBracket";
import Teams from "./components/Teams/Teams";
import Invites from "./components/Invites/Invites";

const Routes = props => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/brackets" component={BracketViewer} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/discover" component={Discover} />
            <Route path="/manage/create" component={ManageCreateBracket} />
            <Route path="/manage/:id" component={ManageViewBracket} />
            <Route path="/manage" component={Manage} />
            <Route path="/teams" component={Teams} />
            <Route path="/invites" component={Invites} />
        </Switch>
    );
};

const mapStateToProps = state => {
    return state;
};
export default withRouter(connect(mapStateToProps)(Routes));
