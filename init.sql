CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES
('jethalal', 'jethalal@example.com'),
('babita', 'babita@example.com'),
('champaklal', 'champaklal@example.com');
