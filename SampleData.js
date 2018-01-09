const bracket1 = {
    name: "Test Bracket",
    organizer: {
        organizerID: 1,
        organizerName: "Larry",
        imageURL: null
    },
    bracketID: 123,
    createdAt: "2018-01-09T15:35:07.962Z",
    startTime: "2018-01-10T16:00:00.962Z",
    completedAt: null,
    description: "To test the data structure of brackets.",
    subject: "ping pong",
    format: "single-elimination",
    imageURL: null,
    rounds: [
        {
            roundName: "ROUND 1",
            roundID: 123,
            roundNumber: 1,
            bestOf: 1,
            matches: [
                {
                    matchID: 1,
                    team1: {
                        playerInfo: {
                            alias: "Player 1",
                            playerID: 1,
                            imageURL: null
                        },
                        teamName: "Team 1",
                        teamID: 1
                    },
                    team2: {
                        playerInfo: {
                            alias: "Player 2",
                            playerID: 2,
                            imageURL: null
                        },
                        teamName: "Team 2",
                        teamID: 2
                    },
                    team1Score: 1,
                    team2Score: 0,
                    completed: true,
                    winnerTeamID: 2
                },
                {
                    matchID: 2,
                    team1: {
                        playerInfo: {
                            alias: "Player 3",
                            playerID: 3,
                            imageURL: null
                        },
                        teamName: "Team 3",
                        teamID: 3
                    },
                    team2: {
                        playerInfo: {
                            alias: "Player 4",
                            playerID: 4,
                            imageURL: null
                        },
                        teamName: "Team 4",
                        teamID: 4
                    },
                    team1Score: 0,
                    team2Score: 1,
                    completed: true,
                    winnerTeamID: 4
                }
            ]
        },
        {
            roundName: "ROUND 2",
            roundID: 124,
            roundNumber: 2,
            bestOf: 3,
            matches: [
                {
                    matchID: 3,
                    team1: {
                        playerInfo: {
                            alias: "Player 1",
                            playerID: 1,
                            imageURL: null
                        },
                        teamName: "Team 1",
                        teamID: 1
                    },
                    team2: {
                        playerInfo: {
                            alias: "Player 4",
                            playerID: 4,
                            imageURL: null
                        },
                        teamName: "Team 4",
                        teamID: 4
                    },
                    team1Score: 0,
                    team2Score: 0,
                    completed: false,
                    winnerTeamID: null
                }
            ]
        }
    ]
};

// {
//     "participant": {
//       "id": 67017754,
//       "seed": 1,
//       "display_name": "a",
//       "portrait_url": null,
//       "participant_id": null
//     },
//     "index": 0,
//     "placeholderText": null,
//     "score": 1,
//     "isWinner": true,
//     "dropzoneKey": null,
//     "draggableKeys": null,
//     "predictedParticipant": null,
//     "compressed": false,
//     "showToggleButton": false,
//     "svgOnly": false,
//     "theme": {
//       "id": "challonge",
//       "timestamp": 1515452438006,
//       "options": {},
//       "animateBracketLinesOnInitialRender": false,
//       "match": {}
//     },
//     "leaveRoomForReportScoresIcon": false,
//     "forfeited": null
//   }
//   {
//     "x": 244,
//     "y": 87,
//     "match": {
//       "id": 108360524,
//       "tournament_id": 4158261,
//       "identifier": 9,
//       "round": 2,
//       "state": "complete",
//       "underway_at": null,
//       "player1": {},
//       "player2": {},
//       "player1_prereq_identifier": 1,
//       "player2_prereq_identifier": 2,
//       "player1_is_prereq_match_loser": false,
//       "player2_is_prereq_match_loser": false,
//       "player1_placeholder_text": null,
//       "player2_placeholder_text": null,
//       "winner_id": 67017754,
//       "loser_id": 67017785,
//       "scores": {},
//       "games": {},
//       "editable_by_user_ids": {},
//       "has_attachment": false,
//       "is_group_match": false,
//       "forfeited": null,
//       "md5": "69e1ae8ba241704ab3bad076fc90127b"
//     },
//     "quickAdvance": false,
//     "hideSeeds": false,
//     "draggableKeys": null,
//     "predictions": null,
//     "svgOnly": false,
//     "animated": false,
//     "compressed": false,
//     "theme": {
//       "id": "challonge",
//       "timestamp": 1515452438006,
//       "options": {},
//       "animateBracketLinesOnInitialRender": false,
//       "match": {}
//     },
//     "showDetailsOnHover": true
//   }

[
    {
        roundNumber: 1,
        roundName: "Round 1",
        matchArr: [
            {
                team1: {
                    teamID: null,
                    teamName: "BYE",
                    player: null
                },
                team2: {
                    teamID: 1,
                    teamName: "Team 1",
                    player: {
                        playerID: 1,
                        player_alias: "Player 1"
                    }
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            },
            {
                team1: {
                    teamID: 2,
                    teamName: "Team 2",
                    player: {
                        playerID: 2,
                        player_alias: "Player 2"
                    }
                },
                team2: {
                    teamID: 3,
                    teamName: "Team 3",
                    player: {
                        playerID: 3,
                        player_alias: "Player 3"
                    }
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            },
            {
                team1: {
                    teamID: 4,
                    teamName: "Team 4",
                    player: {
                        playerID: 4,
                        player_alias: "Player 4"
                    }
                },
                team2: {
                    teamID: 5,
                    teamName: "Team 5",
                    player: {
                        playerID: 5,
                        player_alias: "Player 5"
                    }
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            },
            {
                team1: {
                    teamID: 6,
                    teamName: "Team 6",
                    player: {
                        playerID: 6,
                        player_alias: "Player 6"
                    }
                },
                team2: {
                    teamID: 7,
                    teamName: "Team 7",
                    player: {
                        playerID: 7,
                        player_alias: "Player 7"
                    }
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            }
        ]
    },
    {
        roundNumber: 2,
        roundName: "Round 2",
        matchArr: [
            {
                team1: 2,
                team2: {
                    teamID: null,
                    teamName: "TBD",
                    player: null
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            },
            {
                team1: 2,
                team2: {
                    teamID: null,
                    teamName: "TBD",
                    player: null
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            },
            {
                team1: 2,
                team2: {
                    teamID: null,
                    teamName: "TBD",
                    player: null
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            }
        ]
    },
    {
        roundNumber: 3,
        roundName: "Round 3",
        matchArr: [
            {
                team1: 3,
                team2: {
                    teamID: null,
                    teamName: "TBD",
                    player: null
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            },
            {
                team1: 3,
                team2: {
                    teamID: null,
                    teamName: "TBD",
                    player: null
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            }
        ]
    },
    {
        roundNumber: 4,
        roundName: "Round 4",
        matchArr: [
            {
                team1: 4,
                team2: {
                    teamID: null,
                    teamName: "TBD",
                    player: null
                },
                team1Score: 0,
                team2Score: 0,
                completed: false,
                winnerID: null
            }
        ]
    }
];
