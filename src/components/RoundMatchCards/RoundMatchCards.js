// IMPORT DEPENDENCIES
import React from "react";
// MATERIAL UI
import { Card, CardHeader, CardText } from "material-ui/Card";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCheck, faEdit } from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLING
import "./RoundMatchCards.css";

// COMPONENT
const RoundMatchCards = ({
    bracketStructure = {},
    showControls = false,
    infoClick = () => null,
    editClick = () => null,
    confirmClick = () => null
}) => {
    console.log(bracketStructure);
    let roundCards;
    if (bracketStructure.numRounds > 0) {
        roundCards = bracketStructure.roundsArr.map((round, index) => {
            return (
                <Card key={index} style={{ marginBottom: "15px" }}>
                    <CardHeader
                        title={`${round.roundName}`}
                        subtitle={
                            index + 1 === bracketStructure.numRounds
                                ? "Finals"
                                : index + 1 === bracketStructure.numRounds - 1
                                  ? "Semifinals"
                                  : `Round of ${round.matchArr.length * 2}`
                        }
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        {round.matchArr.map((match, index2) => {
                            return (
                                <div key={index2} className="card-match">
                                    <div
                                        className={"card-match-info"}
                                        onClick={() =>
                                            infoClick(match.match_id)
                                        }
                                    >
                                        <div
                                            className={
                                                match.winner_team_id ===
                                                    match.team1_id &&
                                                match.winner_team_id !== null
                                                    ? "card-team card-team-winner"
                                                    : "card-team"
                                            }
                                        >
                                            <span
                                                style={
                                                    match.team1_name
                                                        ? {}
                                                        : { color: "#7a7a7a" }
                                                }
                                            >
                                                {match.team1_name ||
                                                    (match.round_number === 1
                                                        ? "BYE"
                                                        : "TBD")}
                                            </span>
                                            <span>{match.team1_score}</span>
                                        </div>
                                        <div className="card-team-divider" />
                                        <div
                                            className={
                                                match.winner_team_id ===
                                                    match.team2_id &&
                                                match.winner_team_id !== null
                                                    ? "card-team card-team-winner"
                                                    : "card-team"
                                            }
                                        >
                                            <span
                                                style={
                                                    match.team2_name
                                                        ? {}
                                                        : { color: "#7a7a7a" }
                                                }
                                            >
                                                {match.team2_name ||
                                                    (match.round_number === 1
                                                        ? "BYE"
                                                        : "TBD")}
                                            </span>
                                            <span>{match.team2_score}</span>
                                        </div>
                                    </div>
                                    {showControls &&
                                    !match.completed &&
                                    (match.team1_name || match.team2_name) ? (
                                        <div className="card-match-controls-container">
                                            <div
                                                className="card-match-control"
                                                onClick={e =>
                                                    editClick(
                                                        match.bracket_id,
                                                        match.match_id
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                                <span className="card-control-label">
                                                    EDIT
                                                </span>
                                            </div>
                                            <div className="card-match-control">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                />
                                                <span className="card-control-label">
                                                    CONIFRM
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </CardText>
                </Card>
            );
        });
    } else {
        roundCards = <div>Bracket has not started</div>;
    }

    return <div>{roundCards}</div>;
};

export default RoundMatchCards;
