// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import moment from "moment";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ParticipantTable from "../ParticipantTable/ParticipantTable";
import InvitedTable from "../InvitedTable/InvitedTable";
// MATERIAL UI
import { Tabs, Tab } from "material-ui/Tabs";
import Chip from "material-ui/Chip";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
    faPlus
    // faEnvelope
} from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ViewBracket.css";
// IMPORT REDUX FUNCTIONS
import { retrieveBracketData } from "./../../ducks/bracketReducer";

class ViewBracket extends Component {
    componentDidMount() {
        this.props.retrieveBracketData(this.props.match.params.id);
    }
    // handleRowClick = bracketID => {
    //     this.props.history.push(`/manage/${bracketID}`);
    // };
    render() {
        console.log(this.props);
        const breadcrumbs = [
            {
                name: "Manage",
                link: "/manage"
            },
            {
                name: this.props.brackets.bracketName,
                link: `/manage/${this.props.brackets.bracketID}`
            }
        ];
        let headerControls = null;
        if (this.props.brackets.bracketStatus === "ready") {
            headerControls = (
                <div className="ui-header-controls">
                    <button
                        // onClick={() =>
                        //     this.props.publishBracket(
                        //         this.props.brackets.bracketID
                        //     )
                        // }
                        className="ui-button-header button-confirm button-short"
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="ui-button-icon"
                        />
                        Join
                    </button>
                </div>
            );
        } else if (
            this.props.brackets.bracketStatus === "live" ||
            this.props.brackets.bracketStatus === "completed"
        ) {
            headerControls = <div className="ui-header-controls" />;
        }
        const bracketTabLabel =
            this.props.brackets.bracketStatus !== "live"
                ? "BRACKET (PREVIEW)"
                : "BRACKET";
        const matchesTabLabel =
            this.props.brackets.bracketStatus !== "live"
                ? "MATCHES (PREVIEW)"
                : "MATCHES";
        const participants =
            this.props.brackets.bracketParticipantType === "player"
                ? this.props.brackets.bracketPlayers
                : this.props.brackets.bracketTeams;
        const invited =
            this.props.brackets.bracketParticipantType === "player"
                ? this.props.brackets.bracketInvitedPlayers
                : this.props.brackets.bracketInvitedTeams;
        return (
            <div className="portal-container">
                <Sidebar />
                <div className="content-container">
                    <Breadcrumb crumbsArray={breadcrumbs} />
                    <div className="manage-view-bracket-container">
                        <div className="ui-title-header">
                            <div className="ui-title-with-chip">
                                <h2 className="ui-form-title">
                                    {this.props.brackets.bracketName}
                                </h2>
                                <Chip
                                    style={{ padding: "1px" }}
                                    labelStyle={{ fontSize: "12px" }}
                                >
                                    {this.props.brackets.bracketStatus.toUpperCase()}
                                </Chip>
                            </div>
                            {headerControls}
                        </div>
                        <Tabs style={{ width: "100%" }}>
                            <Tab
                                label="OVERVIEW"
                                style={{ borderBottom: "2px solid #5a5a5a" }}
                            >
                                <div className="bracket-tab-content-container">
                                    <div className="bracket-data-pair">
                                        <h5 className="bracket-data-title">
                                            SUBJECT
                                        </h5>
                                        <p className="bracket-data-info">
                                            {this.props.brackets.bracketSubject}
                                        </p>
                                    </div>
                                    <div className="bracket-data-pair">
                                        <h5 className="bracket-data-title">
                                            START DATE & TIME
                                        </h5>
                                        <p className="bracket-data-info">
                                            {moment(
                                                this.props.brackets
                                                    .bracketStartDate
                                            ).format("dddd, MMMM do, YYYY")}
                                            {" at "}
                                            {moment(
                                                this.props.brackets
                                                    .bracketStartTime
                                            ).format("h:mmA")}
                                            <span className="bracket-pair-subtext">
                                                UTC
                                                {moment(
                                                    this.props.brackets
                                                        .bracketStartTime
                                                ).format("Z")}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="bracket-data-pair">
                                        <h5 className="bracket-data-title">
                                            FORMAT
                                        </h5>
                                        <p className="bracket-data-info">
                                            {this.props.brackets
                                                .bracketFormat ===
                                            "single-elimination"
                                                ? "Single Elimination"
                                                : this.props.brackets
                                                      .bracketFormat ===
                                                  "double-elimination"
                                                  ? "Double Elimination"
                                                  : "Other"}{" "}
                                            {this.props.brackets
                                                .bracketParticipantType ===
                                            "player"
                                                ? "1v1"
                                                : "Teams"}
                                        </p>
                                    </div>
                                    <div className="bracket-data-pair">
                                        <h5 className="bracket-data-title">
                                            DESCRIPTION
                                        </h5>
                                        <p className="description-text">
                                            {
                                                this.props.brackets
                                                    .bracketDescription
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                label="PARTICIPANTS"
                                style={{
                                    borderBottom: "2px solid #5a5a5a"
                                }}
                            >
                                <div className="bracket-tab-content-container">
                                    <div className="ui-subtitle-header">
                                        <h2 className="ui-form-subtitle">
                                            Current Participants
                                        </h2>
                                        {/* <Link
                                            to="/manage/create"
                                            className="ui-link"
                                        >
                                            <button className="ui-button-header button-main button-medium">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className="ui-button-icon"
                                                />
                                                Invite Friends
                                            </button>
                                        </Link> */}
                                    </div>
                                    <ParticipantTable
                                        participantType={
                                            this.props.brackets
                                                .bracketParticipantType
                                        }
                                        participantList={participants}
                                    />
                                    <div className="ui-subtitle-header">
                                        <h2 className="ui-form-subtitle">
                                            Invited
                                        </h2>
                                    </div>
                                    <InvitedTable
                                        participantType={
                                            this.props.brackets
                                                .bracketParticipantType
                                        }
                                        invitedList={invited}
                                    />
                                </div>
                            </Tab>
                            <Tab
                                label={bracketTabLabel}
                                style={{ borderBottom: "2px solid #5a5a5a" }}
                            >
                                <div className="bracket-tab-content-container">
                                    <h3>View Bracket</h3>
                                    <p>See Full Screen</p>
                                    <p>Preview Bracket</p>
                                </div>
                            </Tab>
                            <Tab
                                label={matchesTabLabel}
                                style={{ borderBottom: "2px solid #5a5a5a" }}
                            >
                                <div className="bracket-tab-content-container">
                                    <h3>Match List</h3>
                                    <p>Edit / Submit Scores</p>
                                    <p>Change Winner</p>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, {
    retrieveBracketData
})(ViewBracket);
