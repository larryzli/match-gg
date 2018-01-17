// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
// IMPORT STYLING
import "./Teams.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// COMPONENT
class Teams extends Component {
    render() {
        const breadcrumbs = [{ name: "Teams", link: "/teams" }];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="teams-container">Teams</div>
                    </div>
                </div>
            </div>
        );
    }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(Teams);
