SELECT bracket_id, u.user_id AS id, seed, joined_at, alias AS name FROM bracket_player bp 
JOIN "user" AS u ON bp.user_id=u.user_id WHERE bp.bracket_id = $1 ORDER BY joined_at ASC;