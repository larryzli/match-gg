module.exports = {
    getUserInfo: (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.user;
        db
            .get_user_by_user_id([user_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    },
    getUserBrackets: (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.user;
        db.get_user_brackets_by_user_id([user_id]).then(response => {
            return res.status(200).json(response);
        });
    },
    getUserMatches: (req, res) => {
        const db = req.app.get("db");
        const { user_id } = req.user;
        db.get_user_matches_by_user_id([user_id]).then(response => {
            return res.status(200).json(response);
        });
    }
};
