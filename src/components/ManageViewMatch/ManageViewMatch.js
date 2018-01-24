// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./ManageViewMatch.css";
// IMPORT REDUX FUNCTIONS
import { retrieveMatchData } from "../../ducks/matchReducer";

// COMPONENT
class ManageViewMatch extends Component {
    componentDidMount() {
        this.props.retrieveMatchData(this.props.match.params.matchid);
    }
    render() {
        console.log(this.props);
        const breadcrumbs = [
            { name: "Manage", link: "/manage" },
            {
                name: this.props.matches.matchBracketName,
                link: `/manage/${this.props.matches.matchBracketID}`
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
            <div>
                <div className="portal-container">
                    <Sidebar />
                    <div className="content-container">
                        <Breadcrumb crumbsArray={breadcrumbs} />
                        <div className="manage-view-match-container">
                            <div className="ui-title-header">
                                <h2 className="ui-form-title">Match Details</h2>
                                <div className="ui-header-controls">
                                    {/* <Link to="/manage/create" className="ui-link"> */}
                                    <button className="ui-button-header button-confirm button-short">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="ui-button-icon"
                                        />
                                        Confirm
                                    </button>
                                    {/* </Link> */}
                                    <button className="ui-button-header button-main button-short">
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="ui-button-icon"
                                        />
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className="view-match-name-score">
                                <div className="view-match-team-name">
                                    {this.props.matches.team1Name ||
                                        (this.props.matches.matchRoundNumber ===
                                        1
                                            ? "BYE"
                                            : "TBD")}
                                </div>
                                <div className="view-match-score">
                                    <span className="match-score">
                                        {this.props.matches.team1Score}
                                    </span>
                                    <span className="match-score-divider">
                                        -
                                    </span>
                                    <span className="match-score">
                                        {this.props.matches.team2Score}
                                    </span>
                                </div>
                                <div className="view-match-team-name">
                                    {this.props.matches.team2Name ||
                                        (this.props.matches.matchRoundNumber ===
                                        1
                                            ? "BYE"
                                            : "TBD")}
                                </div>
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
export default connect(mapStateToProps, { retrieveMatchData })(ManageViewMatch);
