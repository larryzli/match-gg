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
            bracketStatus
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
                bracketStatus
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
    }
};
