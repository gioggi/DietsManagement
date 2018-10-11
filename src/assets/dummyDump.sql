CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER);
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5');
CREATE TABLE IF NOT EXISTS  diets(
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  duration  SMALLINT NOT NULL,
  goal TEXT NOT NULL,
  start_date DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS  diet_days(
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  w_day   TEXT NOT NULL,
  diet_id INTEGER NOT NULL,
  FOREIGN KEY(diet_id) REFERENCES diets(id)
);
CREATE TABLE IF NOT EXISTS  meals(
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  diet_day_id  INTEGER NOT NULL,
  FOREIGN KEY(diet_day_id) REFERENCES diet_days(id)
);
CREATE TABLE IF NOT EXISTS  meal_components(
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  food   TEXT NOT NULL,
  quantity  SMALLINT NOT NULL,
  meal_id INTEGER NOT NULL,
  FOREIGN KEY(meal_id) REFERENCES meals(id)
);
