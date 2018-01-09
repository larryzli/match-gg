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
    format: "single-elimination",
    imageURL: null,
    rounds: [
        {
            roundName: "ROUND 1",
            bestOf: 1,
            matches: [
                {
                    matchID: 1,
                    team1: {
                        playerInfo: {
                            playerName: "Team 1",
                            playerID: 1,
                            seed: 1,
                            imageURL: null
                        },
                        score: 1,
                        isWinner: true
                    },
                    team2: {
                        playerInfo: {
                            playerName: "Team 2",
                            playerID: 2,
                            seed: 2,
                            imageURL: null
                        },
                        score: 0,
                        isWinner: false
                    },
                    completed: true,
                    winnerID: 1
                },
                {
                    matchID: 2,
                    team1: {
                        playerInfo: {
                            playerName: "Team 3",
                            playerID: 3,
                            seed: 3,
                            imageURL: null
                        },
                        score: 0,
                        isWinner: false
                    },
                    team2: {
                        playerInfo: {
                            playerName: "Team 4",
                            playerID: 4,
                            seed: 4,
                            imageURL: null
                        },
                        score: 1,
                        isWinner: true
                    },
                    completed: true,
                    winnerID: 4
                }
            ]
        },
        {
            roundName: "ROUND 2",
            bestOf: 3,
            matches: [
                {
                    matchID: 3,
                    team1: {
                        playerInfo: {
                            playerName: "Team 1",
                            playerID: 1,
                            seed: 1,
                            imageURL: null
                        },
                        score: 0,
                        isWinner: false
                    },
                    team2: {
                        playerInfo: {
                            playerName: "Team 4",
                            playerID: 4,
                            seed: 4,
                            imageURL: null
                        },
                        score: 0,
                        isWinner: false
                    },
                    completed: false,
                    winnerID: null
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
