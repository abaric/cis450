SELECT s.school_name, s.graduation_rate
FROM schools s JOIN located_in l ON s.id = l.school_id
WHERE l.neighborhood_id = 134 OR l.neighborhood_id = 112;



