SELECT user_id, SUM(calories) AS total_calories
FROM food_log
GROUP BY user_id;

SELECT food, COUNT(*) AS count
FROM food_log
GROUP BY food
ORDER BY count DESC
LIMIT 1;

SELECT AVG(proteins) AS avg_proteins, AVG(carbs) AS avg_carbs, AVG(fats) AS avg_fats
FROM food_log;

SELECT DATE_PART('week', consumption_date) AS week, SUM(calories) AS weekly_calories
FROM food_log
GROUP BY DATE_PART('week', consumption_date)
ORDER BY week;
