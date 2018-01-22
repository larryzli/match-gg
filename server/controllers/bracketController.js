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
        console.log(req.body);
        console.log(bracket_id);
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
    }
};
