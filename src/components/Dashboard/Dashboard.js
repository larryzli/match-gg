// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// IMPORT STYLING
import "./Dashboard.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// COMPONENT
class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb
                            crumbsArray={[
                                { name: "Dashboard", link: "/dashboard" },
                                { name: "Bracket Name", link: "" }
                            ]}
                        />
                        <div className="dashboard-container">Dashboard</div>
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
export default connect(mapStateToProps)(Dashboard);
