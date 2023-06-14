
CREATE DATABASE IF NOT EXISTS willchair DEFAULT CHARACTER SET utf8;
USE willchair;

CREATE TABLE IF NOT EXISTS User (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    user_img LONGBLOB,
    user_level INT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_CEP VARCHAR(20),
    user_phone VARCHAR(20),
    user_houseNum VARCHAR(10),
    user_nota INT
) ENGINE=INNODB;