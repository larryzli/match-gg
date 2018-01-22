INSERT INTO round (round_number, round_name, bracket_id)
VALUES ($1, $2, $3) RETURNING round_id;