// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./Manage.css";

// COMPONENT
class Manage extends Component {
    render() {
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb
                            crumbsArray={[{ name: "Manage", link: "/manage" }]}
                        />
                        <div className="manage-container">
                            <div>BRACKET LIST</div>
                            <Link to="/manage/create/bracket">
                                <button className="ui-button button-main">
                                    Create New Bracket
                                </button>
                            </Link>
                        </div>
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
export default connect(mapStateToProps)(Manage);
