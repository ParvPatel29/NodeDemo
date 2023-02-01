ALTER TABLE chg_admin RENAME COLUMN aStaus to aStatus;
ALTER TABLE chg_users ADD uPassword varchar(255);
INSERT INTO chg_admin (adminId, aName, aEmail, aRole, aPassword, aStatus) VALUES('1', 'admin', 'admin@gmail.com', '1', '$2b$10$bz1k7F1M52s6Li//RE7CZu6RmapedpaFMZiSPO8QG6Q.cDwXg06qe', '1'
);

CREATE TABLE chg_user_otp(
id int primary key auto_increment,
usertype int not null,
otp varchar(255) not null,
mobilenumber varchar(255),
userid int not null
);