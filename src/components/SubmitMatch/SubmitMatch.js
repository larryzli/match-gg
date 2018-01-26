// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// IMPORT MATERIAL UI COMPONENTS
import TextField from "material-ui/TextField";
// import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
// import Checkbox from "material-ui/Checkbox";
// IMPORT COMPONENTS
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// IMPORT STYLING
import "./SubmitMatch.css";
// IMPORT REDUX FUNCTIONS
import {
    retrieveMatchData,
    handleScore1Change,
    handleScore2Change,
    handleCompleteChange,
    handleWinnerChange,
    updateMatchData
} from "../../ducks/matchReducer";

// COMPONENT
class SubmitMatch extends Component {
    componentDidMount() {
        this.props.retrieveMatchData(this.props.match.params.matchid);
    }
    saveHandler() {
        const matchData = {
            team1Score: this.props.matches.team1Score,
            team2Score: this.props.matches.team2Score,
            matchCompleted: this.props.matches.matchCompleted,
            matchWinnerID: this.props.matches.matchWinnerID
        };
        this.props
            .updateMatchData(this.props.match.params.matchid, matchData)
            .then(() => {
                this.props.history.push(
                    `/discover/view/${this.props.matches.matchBracketID}/${
                        this.props.matches.matchID
                    }`
                );
            });
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
                link: `/discover/view/${this.props.matches.matchBracketID}/${
                    this.props.matches.matchID
                }`
            },
            {
                name: "Submit Scores",
                link: `/discover/view/${this.props.matches.matchBracketID}/${
                    this.props.matches.matchID
                }/submit`
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
                                <h2 className="ui-form-title">Scores</h2>
                            </div>
                            <div className="ui-form-container">
                                <div className="ui-form-half-container">
                                    <TextField
                                        autoFocus={true}
                                        fullWidth={true}
                                        disabled={
                                            this.props.matches.team1ID
                                                ? false
                                                : true
                                        }
                                        floatingLabelText={`${this.props.matches
                                            .team1Name ||
                                            (this.props.matches
                                                .matchRoundNumber === 1
                                                ? "BYE"
                                                : "TBD")} Score`}
                                        value={this.props.matches.team1Score}
                                        type="text"
                                        onChange={this.props.handleScore1Change}
                                    />
                                </div>
                                <div className="ui-form-divider" />
                                <div className="ui-form-half-container">
                                    <TextField
                                        fullWidth={true}
                                        disabled={
                                            this.props.matches.team2ID
                                                ? false
                                                : true
                                        }
                                        floatingLabelText={`${this.props.matches
                                            .team2Name ||
                                            (this.props.matches
                                                .matchRoundNumber === 1
                                                ? "BYE"
                                                : "TBD")} Score`}
                                        value={this.props.matches.team2Score}
                                        type="text"
                                        onChange={this.props.handleScore2Change}
                                    />
                                </div>
                            </div>
                            {/* <div className="ui-form-half-container">
                                <h4 className="ui-form-label">Completed</h4>
                                <Checkbox
                                    style={{
                                        marginBottom: "10px",
                                        textAlign: "left"
                                    }}
                                    label="Match Complete"
                                    checked={this.props.matches.matchCompleted}
                                    onCheck={e =>
                                        this.props.handleCompleteChange()
                                    }
                                />
                            </div>
                            {this.props.matches.matchCompleted ? (
                                <div className="ui-form-container">
                                    <h4 className="ui-form-label">
                                        Match Winner
                                    </h4>
                                    <RadioButtonGroup
                                        name="winner"
                                        defaultSelected={
                                            this.props.matches.matchWinnerID ||
                                            ""
                                        }
                                        onChange={this.props.handleWinnerChange}
                                    >
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            disabled={
                                                this.props.matches.team1ID
                                                    ? false
                                                    : true
                                            }
                                            value={
                                                this.props.matches.team1ID || ""
                                            }
                                            label={
                                                this.props.matches.team1Name ||
                                                (this.props.matches
                                                    .matchRoundNumber === 1
                                                    ? "BYE"
                                                    : "TBD")
                                            }
                                        />
                                        <RadioButton
                                            style={{ marginBottom: "10px" }}
                                            disabled={
                                                this.props.matches.team2ID
                                                    ? false
                                                    : true
                                            }
                                            value={
                                                this.props.matches.team2ID ||
                                                "bye"
                                            }
                                            label={
                                                this.props.matches.team2Name ||
                                                (this.props.matches
                                                    .matchRoundNumber === 1
                                                    ? "BYE"
                                                    : "TBD")
                                            }
                                        />
                                    </RadioButtonGroup>
                                </div>
                            ) : null} */}
                            <div className="ui-form-controls">
                                {/* <Link
                                    to={`/manage/${
                                        this.props.matches.matchBracketID
                                    }/${this.props.matches.matchID}`}
                                    className="ui-link"
                                > */}
                                <button
                                    className="ui-button button-secondary button-medium"
                                    onClick={() => this.props.history.goBack()}
                                >
                                    Cancel
                                </button>
                                {/* </Link> */}
                                <button
                                    className="ui-button button-confirm button-medium"
                                    onClick={e => this.saveHandler()}
                                >
                                    Save
                                </button>
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
export default connect(mapStateToProps, {
    retrieveMatchData,
    handleScore1Change,
    handleScore2Change,
    handleCompleteChange,
    handleWinnerChange,
    updateMatchData
})(SubmitMatch);
