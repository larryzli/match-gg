UPDATE match
SET completed = $2,
    winner_team_id = $3
WHERE match_id = $1
RETURNING next_match;