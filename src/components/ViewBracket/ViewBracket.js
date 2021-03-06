// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import moment from "moment";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ParticipantTable from "../ParticipantTable/ParticipantTable";
// import InvitedTable from "../InvitedTable/InvitedTable";
import RoundMatchCards from "../RoundMatchCards/RoundMatchCards";
import Bracket from "../Bracket/Bracket";
// MATERIAL UI
import { Tabs, Tab } from "material-ui/Tabs";
import Chip from "material-ui/Chip";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
    faPlus,
    // faExpandArrowsAlt,
    faMinus
    // faEnvelope
} from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ViewBracket.css";
// IMPORT REDUX FUNCTIONS
import {
    retrieveBracketData,
    playerJoinBracket,
    retrieveBracketPlayers,
    retrieveBracketStructure,
    bracketKickPlayer
} from "./../../ducks/bracketReducer";

class ViewBracket extends Component {
    componentDidMount() {
        this.props
            .retrieveBracketData(this.props.match.params.id)
            .then(() => {
                return this.props.brackets.bracketParticipantType === "player"
                    ? this.props
                          .retrieveBracketPlayers(this.props.brackets.bracketID)
                          .then(() => {
                              return this.props.retrieveBracketStructure(
                                  this.props.brackets.bracketID
                              );
                          })
                          .catch(console.log)
                    : null;
                // : this.props.retrieveBracketTeams
            })
            .catch(console.log);
    }
    handleMatchRowClick = matchID => {
        this.props.history.push(
            `/discover/view/${this.props.brackets.bracketID}/${matchID}`
        );
    };

    render() {
        const breadcrumbs = [
            {
                name: "Discover",
                link: "/Discover"
            },
            {
                name: this.props.brackets.bracketName,
                link: `/discover/view/${this.props.brackets.bracketID}`
            }
        ];
        let headerControls = null;
        if (
            this.props.brackets.bracketStatus === "ready" &&
            this.props.users.user.user_id
        ) {
            headerControls =
                this.props.brackets.bracketParticipants.findIndex(element => {
                    return element.id === this.props.users.user.user_id;
                }) === -1 ? (
                    <div className="ui-header-controls">
                        <button
                            onClick={() =>
                                this.props.playerJoinBracket(
                                    this.props.brackets.bracketID
                                )
                            }
                            className="ui-button-header button-confirm button-short"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="ui-button-icon"
                            />
                            Join
                        </button>
                    </div>
                ) : (
                    <div className="ui-header-controls">
                        <button
                            onClick={() =>
                                this.props.bracketKickPlayer(
                                    this.props.brackets.bracketID,
                                    this.props.users.user.user_id
                                )
                            }
                            className="ui-button-header button-reject button-short"
                        >
                            <FontAwesomeIcon
                                icon={faMinus}
                                className="ui-button-icon"
                            />
                            Leave
                        </button>
                    </div>
                );
        } else if (
            this.props.brackets.bracketStatus === "live" ||
            this.props.brackets.bracketStatus === "completed"
        ) {
            headerControls = <div className="ui-header-controls" />;
        }
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
                                            ).format("dddd, MMMM Do, YYYY")}
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
                                        participantList={
                                            this.props.brackets
                                                .bracketParticipants
                                        }
                                    />
                                    {/* {this.props.brackets.bracketStatus ===
                                    "ready" ? (
                                        <div>
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
                                                    this.props.brackets
                                                        .bracketInvited
                                                }
                                            />
                                        </div>
                                    ) : null} */}
                                </div>
                            </Tab>
                            <Tab
                                label="BRACKET"
                                style={
                                    this.props.brackets.bracketStatus ===
                                    "ready"
                                        ? {
                                              color: "#5a5a5a",
                                              borderBottom: "2px solid #333333"
                                          }
                                        : { borderBottom: "2px solid #5a5a5a" }
                                }
                                disabled={
                                    this.props.brackets.bracketStatus ===
                                    "ready"
                                }
                            >
                                <div className="bracket-tab-content-container">
                                    {/* <div className="bracket-tab-controls">
                                        <button className="ui-button-header button-secondary button-medium">
                                            <FontAwesomeIcon
                                                icon={faExpandArrowsAlt}
                                                className="ui-button-icon"
                                            />
                                            Fullscreen
                                        </button>
                                    </div> */}
                                    <Bracket
                                        bracketStructure={
                                            this.props.brackets.bracketStructure
                                        }
                                        matchClick={
                                            this.props.brackets
                                                .bracketStatus === "ready"
                                                ? () => null
                                                : this.handleMatchRowClick
                                        }
                                    />
                                </div>
                            </Tab>
                            <Tab
                                label="MATCHES"
                                style={
                                    this.props.brackets.bracketStatus ===
                                    "ready"
                                        ? {
                                              color: "#5a5a5a",
                                              borderBottom: "2px solid #333333"
                                          }
                                        : { borderBottom: "2px solid #5a5a5a" }
                                }
                                disabled={
                                    this.props.brackets.bracketStatus ===
                                    "ready"
                                }
                            >
                                <div className="bracket-tab-content-container">
                                    <RoundMatchCards
                                        bracketStructure={
                                            this.props.brackets.bracketStructure
                                        }
                                        infoClick={
                                            this.props.brackets
                                                .bracketStatus === "ready"
                                                ? () => null
                                                : this.handleMatchRowClick
                                        }
                                    />
                                    <p>Submit Scores</p>
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
    playerJoinBracket,
    retrieveBracketPlayers,
    retrieveBracketStructure,
    bracketKickPlayer
})(ViewBracket);
