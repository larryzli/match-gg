SELECT m.match_id, m.team1_id, u.alias AS team1_name, m.team1_score, m.team2_id, u2.alias AS team2_name, m.team2_score, b.best_of, b.finals_best_of, m.completed, m.winner_team_id, m.round_id, r.round_name, r.round_number, m.bracket_id, b.bracket_name, m.next_match FROM match m 
FULL JOIN "user" u ON m.team1_id=u.user_id
FULL JOIN "user" u2 ON m.team2_id=u.user_id
JOIN round r ON m.round_id=r.round_id
JOIN bracket b ON m.bracket_id=b.bracket_id
WHERE match_id = $1;