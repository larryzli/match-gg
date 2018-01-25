SELECT match_id, m.round_id, r.round_name, r.round_number, best_of, team1_id, u.alias as team1_name, team2_id, u2.alias as team2_name, team1_score, team2_score, winner_team_id, completed, m.bracket_id, next_match FROM round r
JOIN match m ON r.round_id = m.round_id
FULL JOIN "user" u ON m.team1_id = u.user_id
FULL JOIN "user" u2 ON m.team2_id = u2.user_id
WHERE m.bracket_id = $1 
ORDER BY round_number ASC, next_match ASC, match_id ASC;