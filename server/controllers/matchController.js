module.exports = {
    getMatchData: (req, res) => {
        const db = req.app.get("db");
        const match_id = req.params.id;
        db
            .get_match_data_by_match_id([match_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    updateMatch: (req, res) => {
        const db = req.app.get("db");
        const match_id = req.params.id;
        const {
            team1Score,
            team2Score,
            matchCompleted,
            matchWinnerID
        } = req.body;
        db
            .update_match_data_by_match_id([
                match_id,
                team1Score,
                team2Score,
                matchCompleted,
                matchWinnerID
            ])
            .then(response => {
                return res.status(200).json(response);
            });
    },
    autoCompleteMatch: (req, res) => {
        const db = req.app.get("db");
        const match_id = req.params.id;
        db
            .get_match_data_by_match_id([match_id])
            .then(response => {
                const matchInfo = response[0];
                // If first round and exactly one of the teams is null
                if (
                    matchInfo.round_number === 1 &&
                    ((!matchInfo.team1_id && matchInfo.team2_id) ||
                        (matchInfo.team1_id && !matchInfo.team2_id))
                ) {
                    // If team1 null then team2 wins
                    if (!matchInfo.team1_id && matchInfo.team2_id) {
                        db
                            .complete_match_by_match_id([
                                match_id,
                                true,
                                matchInfo.team2_id
                            ])
                            .then(response2 => {
                                const next_match = response2[0].next_match;
                                db
                                    .update_next_match_team([
                                        next_match,
                                        matchInfo.team2_id
                                    ])
                                    .then(response3 => {
                                        return res.status(200).json(response3);
                                    });
                                // return res.status(200).json(response2);
                            });
                        // If team2 null then team1 wins
                    } else {
                        db
                            .complete_match_by_match_id([
                                match_id,
                                true,
                                matchInfo.team1_id
                            ])
                            .then(response2 => {
                                const next_match = response2[0].next_match;
                                db
                                    .update_next_match_team([
                                        next_match,
                                        matchInfo.team1_id
                                    ])
                                    .then(response3 => {
                                        return res.status(200).json(response3);
                                    });
                            });
                    }
                    // If there are 2 existing teams
                } else if (matchInfo.team1_id && matchInfo.team2_id) {
                    // If team1 score higher then team2 score, team1 wins
                    if (matchInfo.team1_score > matchInfo.team2_score) {
                        db
                            .complete_match_by_match_id([
                                match_id,
                                true,
                                matchInfo.team1_id
                            ])
                            .then(response2 => {
                                const next_match = response2[0].next_match;
                                db
                                    .update_next_match_team([
                                        next_match,
                                        matchInfo.team1_id
                                    ])
                                    .then(response3 => {
                                        return res.status(200).json(response3);
                                    });
                            });
                        // If team1 score lower than team2 score, team2 wins
                    } else if (matchInfo.team1_score < matchInfo.team2_score) {
                        db
                            .complete_match_by_match_id([
                                match_id,
                                true,
                                matchInfo.team2_id
                            ])
                            .then(response2 => {
                                const next_match = response2[0].next_match;
                                db
                                    .update_next_match_team([
                                        next_match,
                                        matchInfo.team2_id
                                    ])
                                    .then(response3 => {
                                        return res.status(200).json(response3);
                                    });
                            });
                    } else {
                        // If scores are the same there is no winner, do nothing
                        return res.status(200).json();
                    }
                } else {
                    // If not round 1 and there is only 1 team or no teams, do nothing
                    return res.status(200).json();
                }
            })
            .catch(console.log);
    }
};
