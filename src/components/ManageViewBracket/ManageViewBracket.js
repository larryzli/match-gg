// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
// import swal from "sweetalert";
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
import Dialog from "material-ui/Dialog";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faCheck,
    faPlay
    // faEnvelope
    // faExpandArrowsAlt
} from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ManageViewBracket.css";
// IMPORT REDUX FUNCTIONS
import {
    retrieveBracketData,
    publishBracket,
    startBracket,
    completeBracket,
    retrieveBracketPlayers,
    bracketKickPlayer,
    swapSeeds,
    generateBracketStructure,
    retrieveBracketStructure,
    deleteBracketStructure,
    resolveByes
} from "./../../ducks/bracketReducer";
import { matchAutoComplete } from "../../ducks/matchReducer";

class ManageViewBracket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDialog: false,
            completeDialog: false
        };
        this.openStart = this.openStart.bind(this);
        this.closeStart = this.closeStart.bind(this);
    }
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
    kickPlayerHandler(bracketID, user_id) {
        this.props.bracketKickPlayer(bracketID, user_id);
    }
    handleMatchRowClick = matchID => {
        this.props.history.push(
            `/manage/${this.props.brackets.bracketID}/${matchID}`
        );
    };
    handleMatchEditClick = (bracketID, matchID) => {
        this.props.history.push(`/manage/${bracketID}/${matchID}/edit`);
    };
    handleMatchConfirmClick = matchID => {
        this.props.matchAutoComplete(matchID).then(response => {
            this.props.retrieveBracketStructure(this.props.brackets.bracketID);
        });
    };
    handleGenerateClick() {
        this.props
            .deleteBracketStructure(this.props.brackets.bracketID)
            .then(() => {
                this.props
                    .generateBracketStructure(
                        this.props.brackets.bracketID,
                        this.props.brackets.bracketParticipants
                    )
                    .then(() => {
                        this.props
                            .retrieveBracketStructure(
                                this.props.brackets.bracketID
                            )
                            .then(() => {
                                if (
                                    this.props.brackets.bracketStructure
                                        .roundsArr
                                ) {
                                    this.props
                                        .resolveByes(
                                            this.props.brackets.bracketStructure.roundsArr[0].matchArr.map(
                                                match => match.match_id
                                            )
                                        )
                                        .then(() => {
                                            this.props.retrieveBracketStructure(
                                                this.props.brackets.bracketID
                                            );
                                        })
                                        .catch(console.log);
                                }
                            })
                            .catch(console.log);
                    })
                    .catch(console.log);
            })

            .catch(console.log);
    }
    openStart = () => {
        this.setState({ startDialog: true });
    };
    closeStart = () => {
        this.setState({ startDialog: false });
    };
    startHandler = () => {
        this.props.startBracket(this.props.brackets.bracketID).then(() => {
            this.handleGenerateClick();
        });
        this.setState({ startDialog: false });
    };
    openComplete = () => {
        this.setState({ completeDialog: true });
    };
    closeComplete = () => {
        this.setState({ completeDialog: false });
    };
    completeHandler = () => {
        this.props.completeBracket(this.props.brackets.bracketID);
        this.setState({ completeDialog: false });
    };
    render() {
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
        const startActions = [
            <button
                onClick={this.closeStart}
                className="ui-button button-secondary button-medium"
                style={{ marginBottom: "10px" }}
            >
                Cancel
            </button>,
            <button
                onClick={this.startHandler}
                className="ui-button button-confirm button-medium"
                style={{ marginBottom: "10px" }}
            >
                Start
            </button>
        ];
        const completeActions = [
            <button
                onClick={this.closeComplete}
                className="ui-button button-secondary button-medium"
                style={{ marginBottom: "10px" }}
            >
                Cancel
            </button>,
            <button
                onClick={this.completeHandler}
                className="ui-button button-confirm button-medium"
                style={{ marginBottom: "10px" }}
            >
                Complete
            </button>
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
                    <button
                        className="ui-button-header button-secondary button-medium"
                        onClick={() => this.handleGenerateClick()}
                    >
                        Generate Preview
                    </button>
                    <button
                        className="ui-button-header button-confirm button-short"
                        onClick={this.openStart}
                    >
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="ui-button-icon"
                        />
                        Start
                    </button>
                    <Dialog
                        title={`Start ${this.props.brackets.bracketName}`}
                        actions={startActions}
                        modal={false}
                        open={this.state.startDialog}
                        onRequestClose={this.closeStart}
                        actionsContainerClassName="ui-form-controls"
                    >
                        {`Once a bracket has started, no more participants can
                        join and you can not update seeding.`}
                        <br />
                        <br />
                        {`Are you sure you
                        want to start this bracket?`}
                    </Dialog>
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
        } else if (this.props.brackets.bracketStatus === "live") {
            headerControls = (
                <div className="ui-header-controls">
                    <button
                        className="ui-button-header button-confirm button-short"
                        onClick={this.openComplete}
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="ui-button-icon"
                        />
                        Complete
                    </button>
                    <Dialog
                        title={`Complete ${this.props.brackets.bracketName}`}
                        actions={completeActions}
                        modal={false}
                        open={this.state.completeDialog}
                        onRequestClose={this.closeComplete}
                        actionsContainerClassName="ui-form-controls"
                    >
                        {`Once a bracket has been completed, you will no longer be able to modify bracket information or bracket matches.`}
                        <br />
                        <br />
                        {`Are you sure you
                        want to complete this bracket?`}
                    </Dialog>
                </div>
            );
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
                                disabled={
                                    this.props.brackets.bracketStatus ===
                                    "draft"
                                }
                                label="PARTICIPANTS"
                                style={
                                    this.props.brackets.bracketStatus ===
                                    "draft"
                                        ? {
                                              color: "#5a5a5a",
                                              borderBottom: "2px solid #333333"
                                          }
                                        : { borderBottom: "2px solid #5a5a5a" }
                                }
                            >
                                <div className="bracket-tab-content-container">
                                    <div className="ui-subtitle-header">
                                        <h2 className="ui-form-subtitle">
                                            Current
                                        </h2>
                                    </div>
                                    <ParticipantTable
                                        participantType={
                                            this.props.bracketParticipantType
                                        }
                                        participantList={
                                            this.props.brackets
                                                .bracketParticipants
                                        }
                                        showControls={
                                            this.props.brackets
                                                .bracketStatus === "ready"
                                        }
                                        kickParticipant={
                                            this.props.bracketKickPlayer
                                        }
                                        swapSeedsClick={this.props.swapSeeds}
                                    />
                                    {/* {this.props.brackets.bracketStatus ===
                                    "ready" ? (
                                        <div>
                                            <div className="ui-subtitle-header">
                                                <h2 className="ui-form-subtitle">
                                                    Invited
                                                </h2>

                                                <button className="ui-button-header button-main button-short">
                                                    <FontAwesomeIcon
                                                        icon={faEnvelope}
                                                        className="ui-button-icon"
                                                    />
                                                    Invite
                                                </button>
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
                                                showControls={true}
                                            />
                                        </div>
                                    ) : null} */}
                                </div>
                            </Tab>
                            <Tab
                                disabled={
                                    this.props.brackets.bracketStatus ===
                                    "draft"
                                }
                                label={
                                    this.props.brackets.bracketStatus ===
                                    "ready"
                                        ? "BRACKET PREVIEW"
                                        : "BRACKET"
                                }
                                style={
                                    this.props.brackets.bracketStatus ===
                                    "draft"
                                        ? {
                                              color: "#5a5a5a",
                                              borderBottom: "2px solid #333333"
                                          }
                                        : { borderBottom: "2px solid #5a5a5a" }
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
                                disabled={
                                    this.props.brackets.bracketStatus ===
                                    "draft"
                                }
                                label={
                                    this.props.brackets.bracketStatus ===
                                    "ready"
                                        ? "MATCHES PREVIEW"
                                        : "MATCHES"
                                }
                                style={
                                    this.props.brackets.bracketStatus ===
                                    "draft"
                                        ? {
                                              color: "#5a5a5a",
                                              borderBottom: "2px solid #333333"
                                          }
                                        : { borderBottom: "2px solid #5a5a5a" }
                                }
                            >
                                <div className="bracket-tab-content-container">
                                    <RoundMatchCards
                                        bracketStructure={
                                            this.props.brackets.bracketStructure
                                        }
                                        showControls={
                                            this.props.brackets
                                                .bracketStatus === "live"
                                                ? true
                                                : false
                                        }
                                        infoClick={
                                            this.props.brackets
                                                .bracketStatus === "ready"
                                                ? () => null
                                                : this.handleMatchRowClick
                                            // : () =>
                                            //       swal(
                                            //           "Start the bracket to view a match"
                                            //       )
                                        }
                                        editClick={this.handleMatchEditClick}
                                        confirmClick={
                                            this.handleMatchConfirmClick
                                        }
                                    />
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
    startBracket,
    completeBracket,
    retrieveBracketPlayers,
    bracketKickPlayer,
    swapSeeds,
    generateBracketStructure,
    retrieveBracketStructure,
    deleteBracketStructure,
    matchAutoComplete,
    resolveByes
})(ManageViewBracket);
