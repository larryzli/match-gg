UPDATE bracket_player
   SET seed = CASE user_id
                 WHEN $2 THEN (SELECT seed FROM bracket_player WHERE user_id = $3 AND bracket_id = $1)
                 WHEN $3 THEN (SELECT seed FROM bracket_player WHERE user_id = $2 AND bracket_id = $1)
              END
WHERE user_id IN ($2,$3) AND bracket_id=$1;