// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
// IMPORT STYLING
import "./Invites.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// COMPONENT
class Invites extends Component {
    render() {
        const breadcrumbs = [{ name: "Invites", link: "/invites" }];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="invites-container">Invites</div>
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
export default connect(mapStateToProps)(Invites);
