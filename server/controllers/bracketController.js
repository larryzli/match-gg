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
    generateBracket: async (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        const { participantList } = req.body; // Sorted by seed asc
        console.log("participantList: ", participantList);

        // Change seeds into null value if it is a BYE
        const changeIntoBye = (seed, participantsCount) => {
            return seed <= participantsCount ? seed : null;
        };

        // Create empty final round of bracket
        const createRoundsWithMatches = async participants => {
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
            // Insert final round into DB
            let next_matches = await db
                .create_bracket_round([rounds, `Round ${rounds}`, bracket_id])
                .then(async response => {
                    // Insert final match into DB
                    const roundID = response[0].round_id;
                    const matchIdResponse = await db.create_round_match([
                        roundID,
                        rounds === 1 ? participantList[0].id : null,
                        rounds === 1 ? participantList[1].id : null,
                        bracket_id,
                        null
                    ]);
                    return [matchIdResponse[0].match_id];
                })
                .catch(console.log);
            let matchStructure = [];
            matchStructure.unshift(next_matches);

            // Create matches for each round going backwards from final match
            for (let round = 1; round < rounds; round++) {
                let currentRound = rounds - round;
                let tempMatches = [];
                const sum = Math.pow(2, round + 1) + 1;

                // Insert matches for each round into temporary array
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

                // Create current round with matches
                let temp_next_matches = await db
                    .create_bracket_round([
                        currentRound,
                        `Round ${currentRound}`,
                        bracket_id
                    ])
                    .then(async response => {
                        const roundID = response[0].round_id;
                        const matchIdResponses = tempMatches.map(
                            async (match, index) => {
                                if (currentRound !== 1) {
                                    return await db.create_round_match([
                                        roundID,
                                        null,
                                        null,
                                        bracket_id,
                                        next_matches[Math.floor(index / 2)]
                                    ]);
                                } else {
                                    return await db.create_round_match([
                                        roundID,
                                        participantList[match[0] - 1]
                                            ? participantList[match[0] - 1].id
                                            : null,
                                        participantList[match[1] - 1]
                                            ? participantList[match[1] - 1].id
                                            : null,
                                        bracket_id,
                                        next_matches[Math.floor(index / 2)]
                                    ]);
                                }
                            }
                        );
                        return await Promise.all(matchIdResponses)
                            .then(async responses => {
                                let resArr = responses
                                    .map(c => c.pop().match_id)
                                    .sort((a, b) => a - b);
                                return resArr;
                            })
                            .catch(console.log);
                    })
                    .catch(console.log);
                matchStructure.unshift(temp_next_matches);

                next_matches = temp_next_matches;
                matches = tempMatches;
            }
            return matchStructure;
        };
        const matchList = await createRoundsWithMatches(participantList);
        console.log("matchList: ", matchList);

        return res.status(200).json(matchList);
    },
    getBracketStructure: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        db.get_bracket_structure([bracket_id]).then(response => {
            console.log(response);
            // Determine number of rounds in bracket
            const numRounds =
                response.length > 0
                    ? response[response.length - 1].round_number
                    : 0;

            // Split matches into rounds
            const roundsArr = [];
            for (let i = 1; i <= numRounds; i++) {
                roundsArr.push({
                    roundNum: i,
                    roundName: response.filter(
                        match => match.round_number === i
                    )[0].round_name,
                    matchArr: response.filter(match => match.round_number === i)
                });
            }
            const structure = {
                numRounds,
                roundsArr
            };
            return res.status(200).json(structure);
        });
    },
    deleteBracketStructure: (req, res) => {
        const db = req.app.get("db");
        const bracket_id = req.params.id;
        db
            .delete_bracket_structure([bracket_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    }
};
