module.exports = {
    getUserInfo: (req, res) => {
        const db = req.ap.get("db");
        const { userID } = req.body;
        db
            .get_user_by_user_id([userID])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    }
};
