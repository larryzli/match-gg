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
        const breadcrumbs = [
            { name: "Manage", link: "/manage" },
            {
                name: this.props.brackets.bracketName,
                link: `/manage/${this.props.brackets.bracketID}`
            },
            {
                name: `Match ${this.props.match.params.matchid}`,
                link: `/manage/${this.props.brackets.bracketID}`
            }
        ];
        return (
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="manage-view-match-container">
                            Manage
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
export default connect(mapStateToProps)(ManageViewMatch);
