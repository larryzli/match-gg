module.exports = {
    getUserInfo: (req, res) => {
        const db = req.ap.get("db");
        const { user_id } = req.user;
        db
            .get_user_by_user_id([user_id])
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(console.log);
    }
};
