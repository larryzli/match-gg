module.exports = {
    createBracket: (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.user;
        const {
            bracketName,
            bracketDescription,
            bracketSubject,
            bracketStartDate,
            bracketStartTime,
            bracketImageURL,
            bracketFormat,
            bracketTeamSizeLimit,
            bracketRandomizeSeeds,
            bracketRandomizeTeams,
            bracketInviteOnly,
            bracketBestOf,
            bracketFinalsBestOf,
            bracketHasPassword,
            bracketMaxTeams,
            bracketStatus,
            bracketParticipantType
        } = req.body;
        const createdAt = new Date();
        db
            .create_bracket([
                bracketName,
                user_id,
                createdAt,
                bracketStartTime,
                bracketStartDate,
                bracketDescription,
                bracketSubject,
                bracketFormat,
                bracketImageURL,
                bracketTeamSizeLimit,
                bracketRandomizeSeeds,
                bracketRandomizeTeams,
                bracketMaxTeams,
                bracketHasPassword,
                bracketInviteOnly,
                bracketBestOf,
                bracketFinalsBestOf,
                bracketStatus,
                bracketParticipantType
            ])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    editBracket: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        const {
            bracketName,
            bracketDescription,
            bracketSubject,
            bracketStartDate,
            bracketStartTime,
            bracketImageURL,
            bracketFormat,
            bracketTeamSizeLimit,
            bracketRandomizeSeeds,
            bracketRandomizeTeams,
            bracketInviteOnly,
            bracketBestOf,
            bracketFinalsBestOf,
            bracketHasPassword,
            bracketMaxTeams,
            bracketStatus,
            bracketParticipantType
        } = req.body;
        db
            .update_bracket_by_bracket_id([
                bracket_id,
                bracketName,
                bracketStartTime,
                bracketStartDate,
                bracketDescription,
                bracketSubject,
                bracketFormat,
                bracketImageURL,
                bracketTeamSizeLimit,
                bracketRandomizeSeeds,
                bracketRandomizeTeams,
                bracketMaxTeams,
                bracketHasPassword,
                bracketInviteOnly,
                bracketBestOf,
                bracketFinalsBestOf,
                bracketStatus,
                bracketParticipantType
            ])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    getCreatorBrackets: (req, res) => {
        const db = req.app.get("db");
        // const creator_id = req.user.user_id;
        const creator_id = 11;
        db
            .get_brackets_by_creator_id([creator_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    getBracketById: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        db
            .get_bracket_by_bracket_id([bracket_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    getPublicBrackets: (req, res) => {
        const db = req.app.get("db");
        db
            .get_all_public_brackets()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    deleteBracket: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        db
            .delete_bracket_using_bracket_id([bracket_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    updateStatus: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        const { newStatus } = req.body;
        db
            .update_status_by_bracket_id([bracket_id, newStatus])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    joinBracketAsPlayer: (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.user;
        const bracket_id = req.params.id;
        db
            .join_bracket_as_player([bracket_id, user_id])
            .then(() =>
                db
                    .get_bracket_players_by_bracket_id([bracket_id])
                    .then(response2 => {
                        return res.status(200).json(response2);
                    })
                    .catch(console.log)
            )
            .catch(console.log);
    },
    getBracketPlayers: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        db
            .get_bracket_players_by_bracket_id([bracket_id])
            .then(response => {
                console.log(response);
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    kickBracketPlayer: (req, res) => {
        const db = req.app.get("db");
        const { bracket_id, user_id } = req.params;
        db
            .remove_player_from_bracket([bracket_id, user_id])
            .then(() =>
                db
                    .get_bracket_players_by_bracket_id([bracket_id])
                    .then(response2 => {
                        return res.status(200).json(response2);
                    })
                    .catch(console.log)
            )
            .catch(console.log);
    },
    generateBracketFirstRound: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        const { participantList } = req.body; // Sorted by seed asc

        // Create BYE participant data
        const bye = {
            id: null,
            name: "BYE"
        };

        // Change seeds into null value if it is a BYE
        const changeIntoBye = (seed, participantsCount) => {
            return seed <= participantsCount ? seed : null;
        };

        // Object factory for matches
        const MatchMaker = (round, team1, team2) => {
            return {
                round,
                team1,
                team2
            };
        };

        // Create first round of bracket with participant list
        const createFirstRound = participants => {
            const participantsCount = participants.length;
            const rounds = Math.ceil(Math.log(participantsCount) / Math.log(2));
            const bracketSize = Math.pow(2, rounds);
            const requiredByes = bracketSize - participantsCount;

            // Check for enough participants
            if (participantsCount < 2) {
                return [];
            }

            // Create seeding for final round
            let matches = [[1, 2]];

            // Create matches for each round going backwards from final match
            for (let round = 1; round < rounds; round++) {
                let tempMatches = [];
                const sum = Math.pow(2, round + 1) + 1;

                // Insert matches for each round
                for (let i = 0; i < matches.length; i++) {
                    let home = changeIntoBye(matches[i][0], participantsCount);
                    let away = changeIntoBye(
                        sum - matches[i][0],
                        participantsCount
                    );
                    tempMatches.push([home, away]);
                    home = changeIntoBye(
                        sum - matches[i][1],
                        participantsCount
                    );
                    away = changeIntoBye(matches[i][1], participantsCount);
                    tempMatches.push([home, away]);
                }
                matches = tempMatches;
            }

            // Insert team values based on seeding numbers
            let matchesWithParticipants = [];
            for (let j in matches) {
                matchesWithParticipants.push(
                    MatchMaker(
                        1,
                        participants[matches[j][0] - 1] || bye,
                        participants[matches[j][1] - 1] || bye
                    )
                );
            }
            return {
                round_number: 1,
                round_name: "Round 1",
                matchesArray: matchesWithParticipants
            };
        };

        const first_round = createFirstRound(participantList);

        // Insert round into DB
        db
            .create_bracket_round([
                first_round.round_number,
                first_round.round_name,
                bracket_id
            ])
            .then(response => {
                console.log("response 1: ", response);
                // Insert matches array into DB
                const roundID = response[0].round_id;
                let matchUploads = first_round.matchesArray.map(async match => {
                    // Insert match into DB
                    try {
                        const response2 = await db.create_round_match([
                            roundID,
                            match.team1.id,
                            match.team2.id,
                            bracket_id
                        ]);
                        console.log("response 2: ", response2);
                        return response2[0].match_id;
                    } catch (e) {
                        console.log(e);
                    }
                });

                // Bundle up promises and return them
                Promise.all(matchUploads)
                    .then(responses => {
                        console.log("response 3: ", responses);
                        return res.status(200).json(responses);
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }
};
