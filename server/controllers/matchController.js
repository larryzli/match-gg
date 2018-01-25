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
    }
};
