// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
// IMPORT STYLING
import "./ManageViewMatch.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// COMPONENT
class ManageViewMatch extends Component {
    render() {
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb
                            crumbsArray={[
                                { name: "Manage", link: "/manage" },
                                { name: "Bracket Name", link: "" }
                            ]}
                        />
                        <div className="dashboard-container">Manage</div>
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
export default connect(mapStateToProps)(ManageViewMatch);
