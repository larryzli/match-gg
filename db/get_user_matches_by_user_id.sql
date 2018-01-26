SELECT m.*, b.bracket_name, b.bracket_id, b.subject, r.round_number, u.alias AS team1_name, u2.alias AS team2_name FROM match m 
JOIN bracket b ON m.bracket_id = b.bracket_id
JOIN round r ON m.round_id = r.round_id
FULL JOIN "user" u ON m.team1_id = u.user_id
FULL JOIN "user" u2 ON m.team2_id = u2.user_id 
WHERE (team1_id = $1 OR team2_id = $1) AND b.status != 'ready'
ORDER BY m.completed, b.created_at, r.round_number, m.match_id DESC;