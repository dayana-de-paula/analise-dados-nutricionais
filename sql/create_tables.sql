CREATE TABLE food_log (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    food TEXT NOT NULL,
    calories FLOAT NOT NULL,
    proteins FLOAT NOT NULL,
    carbs FLOAT NOT NULL,
    fats FLOAT NOT NULL,
    consumption_date DATE NOT NULL
);
