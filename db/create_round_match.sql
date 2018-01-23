INSERT INTO match (round_id, team1_id, team2_id, bracket_id, next_match)
VALUES ($1, $2, $3, $4, $5) RETURNING match_id;