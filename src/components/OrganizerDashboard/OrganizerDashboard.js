// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Header from "../Header/Header";
// IMPORT STYLING
import "./OrganizerDashboard.css";

// COMPONENT
class OrganizerDashboard extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="organizer-dashboard-container">
                    Organizer Dashboard
                </div>
            </div>
        );
    }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(OrganizerDashboard);
