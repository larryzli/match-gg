SELECT bracket_id, bracket_name, subject, start_time, start_date, status, format
FROM bracket
WHERE creator_id = $1
ORDER BY created_at DESC;