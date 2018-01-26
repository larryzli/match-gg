// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrophy } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ViewMatch.css";
// IMPORT REDUX FUNCTIONS
import { retrieveMatchData } from "../../ducks/matchReducer";

// COMPONENT
class ViewMatch extends Component {
    componentDidMount() {
        this.props.retrieveMatchData(this.props.match.params.matchid);
    }
    render() {
        console.log(this.props);
        const breadcrumbs = [
            { name: "Discover", link: "/discover" },
            {
                name: this.props.matches.matchBracketName,
                link: `/discover/view/${this.props.matches.matchBracketID}`
            },
            {
                name: `${this.props.matches.team1Name ||
                    (this.props.matches.matchRoundNumber === 1
                        ? "BYE"
                        : "TBD")} vs ${this.props.matches.team2Name ||
                    (this.props.matches.matchRoundNumber === 1
                        ? "BYE"
                        : "TBD")}`,
                link: `/manage/${this.props.brackets.bracketID}`
            }
        ];
        return (
            <div className="portal-container">
                <Sidebar />
                <div className="content-container">
                    <Breadcrumb crumbsArray={breadcrumbs} />
                    <div className="manage-view-match-container">
                        <div className="ui-title-header">
                            <h2 className="ui-form-title">Match Details</h2>
                            {(this.props.users.user.user_id ===
                                this.props.matches.team1ID ||
                                this.props.users.user.user_id ===
                                    this.props.matches.team2ID) &&
                            !this.props.matches.matchCompleted ? (
                                <div className="ui-header-controls">
                                    <Link
                                        to={`/discover/view/${
                                            this.props.matches.matchBracketID
                                        }/${this.props.matches.matchID}/submit`}
                                        className="ui-link"
                                    >
                                        <button className="ui-button-header button-main button-medium">
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                className="ui-button-icon"
                                            />
                                            Submit Scores
                                        </button>
                                    </Link>
                                </div>
                            ) : null}
                            {/* {this.props.matches.team1ID ||
                            this.props.matches.team2ID ? (
                                <div className="ui-header-controls">
                                    <button className="ui-button-header button-confirm button-short">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="ui-button-icon"
                                        />
                                        Confirm
                                    </button>
                                    <Link
                                        to={`/manage/${
                                            this.props.matches.matchBracketID
                                        }/${this.props.matches.matchID}/edit`}
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
                            ) : null} */}
                        </div>
                        <div className="view-match-info">
                            <div className="view-match-bracket-name">
                                {this.props.matches.matchBracketName}
                            </div>
                            <div className="view-match-round">
                                {this.props.matches.matchRoundName}
                            </div>
                        </div>
                        <div className="view-match-name-score">
                            <div
                                className={
                                    this.props.matches.matchWinnerID &&
                                    this.props.matches.matchWinnerID ===
                                        this.props.matches.team1ID
                                        ? "view-match-winner-name"
                                        : "view-match-team-name"
                                }
                            >
                                {this.props.matches.matchWinnerID &&
                                this.props.matches.matchWinnerID ===
                                    this.props.matches.team1ID ? (
                                    <FontAwesomeIcon
                                        icon={faTrophy}
                                        style={{
                                            color: "#FFEE58",
                                            marginRight: "10px"
                                        }}
                                    />
                                ) : null}
                                {this.props.matches.team1Name ||
                                    (this.props.matches.matchRoundNumber === 1
                                        ? "BYE"
                                        : "TBD")}
                            </div>
                            <div className="view-match-score">
                                <span className="match-score">
                                    {this.props.matches.team1Score}
                                </span>
                                <span className="match-score-divider">-</span>
                                <span className="match-score">
                                    {this.props.matches.team2Score}
                                </span>
                            </div>
                            <div
                                className={
                                    this.props.matches.matchWinnerID &&
                                    this.props.matches.matchWinnerID ===
                                        this.props.matches.team2ID
                                        ? "view-match-winner-name"
                                        : "view-match-team-name"
                                }
                                style={{ justifyContent: "flex-end" }}
                            >
                                {this.props.matches.team2Name ||
                                    (this.props.matches.matchRoundNumber === 1
                                        ? "BYE"
                                        : "TBD")}
                                {this.props.matches.matchWinnerID &&
                                this.props.matches.matchWinnerID ===
                                    this.props.matches.team2ID ? (
                                    <FontAwesomeIcon
                                        icon={faTrophy}
                                        style={{
                                            color: "#FFEE58",
                                            marginLeft: "10px"
                                        }}
                                    />
                                ) : null}
                            </div>
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
export default connect(mapStateToProps, { retrieveMatchData })(ViewMatch);
