INSERT INTO match (round_id, team1_id, team2_id, bracket_id)
VALUES ($1, $2, $3, $4) RETURNING match_id;