CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(75)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(280),
    date date,
    id_user INTEGER
);

ALTER TABLE messages ADD CONSTRAINT fk_id_user_users_id FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE NO ACTION;

INSERT INTO users (name, email) VALUES ('Victor', 'victor@planetearth.earth');
INSERT INTO users (name, email) VALUES ('Stefan', 'stefan@planetearth.earth');

INSERT INTO messages (text, date, id_user) VALUES
  ('Hello from planet Earth. Is there anyone there?', '2021-02-26', 2);

  INSERT INTO messages (text, date, id_user) VALUES
  ('Hello world', '2021-02-26', 3);
