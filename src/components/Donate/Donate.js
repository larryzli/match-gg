// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
// IMPORT STYLING
import "./Donate.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// COMPONENT
class Donate extends Component {
    render() {
        const breadcrumbs = [{ name: "Donate", link: "/donate" }];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="donate-container">Donate</div>
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
export default connect(mapStateToProps)(Donate);
