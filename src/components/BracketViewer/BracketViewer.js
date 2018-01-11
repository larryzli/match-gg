import React, { Component } from "react";
import Header from "../Header/Header";

import "./BracketViewer.css";

export default class BracketViewer extends Component {
    render() {
        const rounds = [
            {
                roundName: "ROUND 1",
                bestOf: 1,
                matches: [
                    {
                        matchID: 1,
                        player1: { playerName: "Team 1", playerID: 1 },
                        player1Score: 1,
                        player2: { playerName: "Team 2", playerID: 2 },
                        player2Score: 0
                    },
                    {
                        matchID: 2,
                        player1: { playerName: "Team 3", playerID: 3 },
                        player1Score: 0,
                        player2: { playerName: "Team 4", playerID: 4 },
                        player2Score: 1
                    }
                ]
            },
            {
                roundName: "ROUND 2",
                bestOf: 3,
                matches: [
                    {
                        player1: { playerName: "Team 1", playerID: 1 },
                        player1Score: 2,
                        player2: { playerName: "Team 4", playerID: 4 },
                        player2Score: 1
                    }
                ]
            }
        ];
        return (
            <div>
                <Header />
                <div className="bracket-viewer">
                    <div className="bracket-column">
                        <div className="bracket-column-header">
                            <div className="column-title">
                                {rounds[0].roundName}
                            </div>
                            <div className="best-of">
                                Best of{" "}
                                <span className="best-of-number">
                                    {rounds[0].bestOf}
                                </span>
                            </div>
                        </div>
                        <div className="column-matches">
                            <div className="bracket-column-match">
                                <div className="bracket-match-team winner">
                                    <span className="bracket-team-name">
                                        {
                                            rounds[0].matches[0].player1
                                                .playerName
                                        }
                                    </span>
                                    <span className="bracket-team-score">
                                        {rounds[0].matches[0].player1Score}
                                    </span>
                                </div>
                                <div className="bracket-match-team loser">
                                    <span className="bracket-team-name">
                                        {
                                            rounds[0].matches[0].player2
                                                .playerName
                                        }
                                    </span>
                                    <span className="bracket-team-score">
                                        {rounds[0].matches[0].player2Score}
                                    </span>
                                </div>
                            </div>
                            <div className="bracket-column-match">
                                <div className="bracket-match-team loser">
                                    <span className="bracket-team-name">
                                        {
                                            rounds[0].matches[1].player1
                                                .playerName
                                        }
                                    </span>
                                    <span className="bracket-team-score">
                                        {rounds[0].matches[1].player1Score}
                                    </span>
                                </div>
                                <div className="bracket-match-team winner">
                                    <span className="bracket-team-name">
                                        {
                                            rounds[0].matches[1].player2
                                                .playerName
                                        }
                                    </span>
                                    <span className="bracket-team-score">
                                        {rounds[0].matches[1].player2Score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bracket-column-divider" />
                    <div className="bracket-column">
                        <div className="bracket-column-header">
                            <div className="column-title">
                                {rounds[1].roundName}
                            </div>
                            <div className="best-of">
                                Best of{" "}
                                <span className="best-of-number">
                                    {rounds[1].bestOf}
                                </span>
                            </div>
                        </div>
                        <div className="column-matches">
                            <div className="bracket-column-match">
                                <div className="bracket-match-team winner">
                                    <span className="bracket-team-name">
                                        {
                                            rounds[1].matches[0].player1
                                                .playerName
                                        }
                                    </span>
                                    <span className="bracket-team-score">
                                        {rounds[1].matches[0].player1Score}
                                    </span>
                                </div>
                                <div className="bracket-match-team loser">
                                    <span className="bracket-team-name">
                                        {
                                            rounds[1].matches[0].player2
                                                .playerName
                                        }
                                    </span>
                                    <span className="bracket-team-score">
                                        {rounds[1].matches[0].player2Score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
