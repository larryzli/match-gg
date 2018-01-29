SELECT bracket_id, bracket_name, subject, start_time, start_date, status, format
FROM bracket
WHERE invite_only = false AND start_date >= NOW() AND status != 'draft'
ORDER BY start_date ASC;