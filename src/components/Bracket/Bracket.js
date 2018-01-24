// IMPORT DEPENDENCIES
import React from "react";
// IMPORT ICONS
// IMPORT STYLING
import "./Bracket.css";

// COMPONENT
const Bracket = ({ bracketStructure, showControls, matchClick }) => {
    let bracketView;
    if (bracketStructure.numRounds > 0) {
        bracketView = bracketStructure.roundsArr.map((round, index) => {
            return (
                <div key={index} className="bracket-tab-column-container">
                    <div className="bracket-tab-column">
                        <div className="bracket-column-header">
                            <div className="column-title">
                                {round.roundName}
                                <div className="column-subtitle">
                                    {index + 1 === bracketStructure.numRounds
                                        ? "Finals"
                                        : index + 1 ===
                                          bracketStructure.numRounds - 1
                                          ? "Semifinals"
                                          : `Round of ${round.matchArr.length *
                                                2}`}
                                </div>
                            </div>
                        </div>
                        <div className="column-matches">
                            {round.matchArr.map((match, index2) => {
                                return (
                                    <div
                                        key={index2}
                                        className="bracket-column-match"
                                        onClick={() =>
                                            matchClick(match.match_id)
                                        }
                                    >
                                        <div className="bracket-match-team">
                                            <span
                                                style={
                                                    match.team1_name
                                                        ? {}
                                                        : {
                                                              color: "#7a7a7a"
                                                          }
                                                }
                                                className="bracket-team-name"
                                            >
                                                {match.team1_name ||
                                                    (match.round_number === 1
                                                        ? "BYE"
                                                        : "TBD")}
                                            </span>
                                            <span className="bracket-team-score">
                                                {match.team1_score}
                                            </span>
                                        </div>
                                        <div
                                            key={index2}
                                            className="bracket-match-team"
                                        >
                                            <span
                                                style={
                                                    match.team2_name
                                                        ? {}
                                                        : {
                                                              color: "#7a7a7a"
                                                          }
                                                }
                                                className="bracket-team-name"
                                            >
                                                {match.team2_name ||
                                                    (match.round_number === 1
                                                        ? "BYE"
                                                        : "TBD")}
                                            </span>
                                            <span className="bracket-team-score">
                                                {match.team2_score}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bracket-column-divider" />
                </div>
            );
        });
    } else {
        bracketView = <div>Bracket has not started</div>;
    }

    return <div className="bracket-tab-viewer">{bracketView}</div>;
};

export default Bracket;
