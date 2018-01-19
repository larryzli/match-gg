UPDATE bracket
SET status = $2
WHERE bracket_id = $1
RETURNING status;