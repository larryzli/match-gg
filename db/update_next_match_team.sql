UPDATE match
SET    team1_id = CASE 
                    WHEN team1_id IS NULL 
                        THEN $2 
                        ELSE team1_id 
                        END,
	   team2_id = CASE 
                    WHEN team1_id IS NOT NULL AND team1_id != $2 AND team2_id IS NULL 
                        THEN $2
                        ELSE team2_id 
                        END

WHERE match_id = $1;