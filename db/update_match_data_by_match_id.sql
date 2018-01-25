UPDATE match
SET team1_score = $2,
    team2_score = $3,
    completed = $4,
    winner_team_id = $5
WHERE match_id = $1;