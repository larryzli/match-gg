// IMPORT DEPENDENCIES
import React from "react";
// MATERIAL UI
import { Card, CardHeader, CardText } from "material-ui/Card";
// IMPORT ICONS
// IMPORT STYLING
import "./RoundMatchCards.css";

// COMPONENT
const RoundMatchCards = ({ bracketStructure, showControls, rowClick }) => {
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
                                  : `Round of ${round.matchArr.length}`
                        }
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        {round.matchArr.map((match, index2) => {
                            console.log("match: ", match);
                            return (
                                <div
                                    key={index2}
                                    className="card-match"
                                    onClick={() => rowClick(match.match_id)}
                                >
                                    <div className={"card-match-info"}>
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
