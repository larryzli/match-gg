// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// MATERIAL UI
import { Tabs, Tab } from "material-ui/Tabs";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ManageViewBracket.css";
// IMPORT REDUX FUNCTIONS
import { retrieveBracketData } from "./../../ducks/bracketReducer";

class ManageViewBracket extends Component {
    componentDidMount() {
        this.props.retrieveBracketData(this.props.match.params.id);
    }
    render() {
        let bracketInfo = { bracket_name: "" };
        console.log(this.props);
        if (this.props.brackets.bracketInfo[0]) {
            bracketInfo = this.props.brackets.bracketInfo[0];
        }
        console.log("bracketInfo: ", bracketInfo);
        const breadcrumbs = [
            {
                name: "Manage",
                link: "/manage"
            },
            {
                name: bracketInfo.bracket_name,
                link: "/manage/create/bracket"
            }
        ];
        return (
            <div className="portal-container">
                <Sidebar />
                <div className="content-container">
                    <Breadcrumb crumbsArray={breadcrumbs} />
                    <div className="manage-view-bracket-container">
                        <Tabs style={{ width: "100%" }}>
                            <Tab label="OVERVIEW">
                                <div className="bracket-tab-content-container">
                                    <div className="manage-brackets-list-header">
                                        <h2 className="ui-form-title">
                                            {bracketInfo.bracket_name}
                                        </h2>
                                        <Link
                                            to="/manage/create/bracket"
                                            className="ui-link"
                                        >
                                            <button className="ui-button-header button-main">
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    className="ui-button-icon"
                                                />
                                                Edit Bracket
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="bracket-data-pair">
                                        <h3>Subject</h3>
                                        <p>{bracketInfo.subject}</p>
                                    </div>
                                    <div className="bracket-data-pair">
                                        <h3>Status</h3>
                                        <p>{bracketInfo.status}</p>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="PARTICIPANTS">
                                <div className="bracket-tab-content-container">
                                    <h3>Team / Player List</h3>
                                    <p>Current Roster / Invited</p>
                                    <p>Kick Participant / Invite Participant</p>
                                </div>
                            </Tab>
                            <Tab label="BRACKET">
                                <div className="bracket-tab-content-container">
                                    <h3>View Bracket</h3>
                                    <p>See Full Screen</p>
                                </div>
                            </Tab>
                            <Tab label="MATCHES">
                                <div className="bracket-tab-content-container">
                                    <h3>Match List</h3>
                                    <p>Edit / Submit Scores</p>
                                    <p>Change Winner</p>
                                </div>
                            </Tab>
                        </Tabs>
                        {/* <div className="manage-brackets-list-header">
                            <h2 className="ui-form-title">Bracket Overview</h2>
                            <Link
                                to="/manage/create/bracket"
                                className="ui-link"
                            >
                                <button className="ui-button-header button-main">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="ui-button-icon"
                                    />
                                    Edit Bracket
                                </button>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { retrieveBracketData })(
    ManageViewBracket
);
