INSERT INTO bracket 
(bracket_name, creator_id, created_at, start_time, start_date, description, subject, format, image_url, team_size, randomize_seeds, randomize_teams, max_teams, has_password, invite_only, best_of, finals_best_of, status)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18 ) RETURNING *;