SELECT first_name, last_name, alias, email, image_url 
FROM user 
WHERE user_id = $1;