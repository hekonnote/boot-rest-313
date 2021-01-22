DROP TABLE IF EXISTS user_role, users, roles;

-- Table: users
CREATE TABLE IF NOT EXISTS users
(
    id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(255) NOT NULL UNIQUE,
    age      INT,
    password VARCHAR(255) NOT NULL
)
    ENGINE = InnoDB;

-- Table: roles
CREATE TABLE IF NOT EXISTS roles
(
    id   BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL
)
    ENGINE = InnoDB;

-- Table: users_roles
CREATE TABLE IF NOT EXISTS user_role
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (role_id) REFERENCES roles (id),

    UNIQUE (user_id, role_id)
)
    ENGINE = InnoDB;

-- Insert data
INSERT INTO users VALUE (1, 'Sergey', 40, 9);
INSERT INTO users VALUE (2, 'Artur', 30, 5);

INSERT INTO roles VALUE (1, 'ROLE_USER');
INSERT INTO roles VALUE (2, 'ROLE_ADMIN');

INSERT INTO user_role VALUE (1, 1);
INSERT INTO user_role VALUE (1, 2);
INSERT INTO user_role VALUE (2, 1);

