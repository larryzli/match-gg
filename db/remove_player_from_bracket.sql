DELETE FROM bracket_player
WHERE bracket_id = $1 AND user_id = $2;