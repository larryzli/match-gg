INSERT INTO team (team_name, player_id)
VALUES ($1, $2) RETURNING team_id;