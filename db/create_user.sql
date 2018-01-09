INSERT INTO "user" (first_name, last_name, alias, email, image_url, auth_id, created_at)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING user_id;