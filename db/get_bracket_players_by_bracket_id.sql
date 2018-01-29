SELECT bracket_id, u.user_id AS id, joined_at, seed, alias AS name FROM bracket_player bp 
JOIN "user" AS u ON bp.user_id=u.user_id WHERE bp.bracket_id = $1 ORDER BY seed ASC;