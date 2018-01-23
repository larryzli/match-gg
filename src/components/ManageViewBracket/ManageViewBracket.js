// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    faEdit,
    faCheck,
    faPlay,
    faEnvelope
} from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ManageViewBracket.css";
// IMPORT REDUX FUNCTIONS
import {
    retrieveBracketData,
    publishBracket,
    retrieveBracketPlayers,
    bracketKickPlayer,
    generateBracketStructure
} from "./../../ducks/bracketReducer";

class ManageViewBracket extends Component {
    componentDidMount() {
        this.props
            .retrieveBracketData(this.props.match.params.id)
            .then(() => {
                return this.props.brackets.bracketParticipantType === "player"
                    ? this.props.retrieveBracketPlayers(
                          this.props.brackets.bracketID
                      )
                    : null;
                // : this.props.retrieveBracketTeams
            })
            .catch(console.log);
    }
    kickPlayerHandler(bracketID, user_id) {
        this.props.bracketKickPlayer(bracketID, user_id);
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
        if (this.props.brackets.bracketStatus === "draft") {
            headerControls = (
                <div className="ui-header-controls">
                    <button
                        onClick={() =>
                            this.props.publishBracket(
                                this.props.brackets.bracketID
                            )
                        }
                        className="ui-button-header button-confirm button-short"
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="ui-button-icon"
                        />
                        Publish
                    </button>
                    <Link
                        to={`/manage/${this.props.brackets.bracketID}/edit`}
                        className="ui-link"
                    >
                        <button className="ui-button-header button-main button-short">
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="ui-button-icon"
                            />
                            Edit
                        </button>
                    </Link>
                </div>
            );
        } else if (this.props.brackets.bracketStatus === "ready") {
            headerControls = (
                <div className="ui-header-controls">
                    <button className="ui-button-header button-confirm button-short">
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="ui-button-icon"
                        />
                        Start
                    </button>
                    <Link
                        to={`/manage/${this.props.brackets.bracketID}/edit`}
                        className="ui-link"
                    >
                        <button className="ui-button-header button-main button-short">
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="ui-button-icon"
                            />
                            Edit
                        </button>
                    </Link>
                </div>
            );
        }
        // const bracketTabLabel =
        //     this.props.brackets.bracketStatus !== "live"
        //         ? "BRACKET (PREVIEW)"
        //         : "BRACKET";
        // const matchesTabLabel =
        //     this.props.brackets.bracketStatus !== "live"
        //         ? "MATCHES (PREVIEW)"
        //         : "MATCHES";
        // const disableOtherTabs =
        //     this.props.brackets.bracketStatus === "draft" ? true : false;
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
                                // disabled={disableOtherTabs}
                                label="PARTICIPANTS"
                                style={{
                                    borderBottom: "2px solid #5a5a5a"
                                }}
                            >
                                <div className="bracket-tab-content-container">
                                    <div className="ui-subtitle-header">
                                        <h2 className="ui-form-subtitle">
                                            Current
                                        </h2>
                                        <Link
                                            to="/manage/create"
                                            className="ui-link"
                                        >
                                            <button className="ui-button-header button-main button-short">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className="ui-button-icon"
                                                />
                                                Invite
                                            </button>
                                        </Link>
                                    </div>
                                    <ParticipantTable
                                        participantType={
                                            this.props.bracketParticipantType
                                        }
                                        participantList={
                                            this.props.brackets
                                                .bracketParticipants
                                        }
                                        showControls={true}
                                        kickParticipant={
                                            this.props.bracketKickPlayer
                                        }
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
                                        invitedList={
                                            this.props.brackets.bracketInvited
                                        }
                                        showControls={true}
                                    />
                                </div>
                            </Tab>
                            <Tab
                                // disabled={disableOtherTabs}
                                label="BRACKET"
                                style={{ borderBottom: "2px solid #5a5a5a" }}
                            >
                                <div className="bracket-tab-content-container">
                                    <h3>View Bracket</h3>
                                    <p>See Full Screen</p>
                                    <button
                                        className="ui-button-header button-secondary button-long"
                                        onClick={() =>
                                            this.props.generateBracketStructure(
                                                this.props.brackets.bracketID,
                                                this.props.brackets
                                                    .bracketParticipants
                                            )
                                        }
                                    >
                                        Generate Preview
                                    </button>
                                </div>
                            </Tab>
                            <Tab
                                // disabled={disableOtherTabs}
                                label="MATCHES"
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
    retrieveBracketData,
    publishBracket,
    retrieveBracketPlayers,
    bracketKickPlayer,
    generateBracketStructure
})(ManageViewBracket);
