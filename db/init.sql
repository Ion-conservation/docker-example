USE docker_mysql;

CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    grade CHAR(1)
);

INSERT INTO student(name, age , grade) VALUES ("张三", 18, "A");
INSERT INTO student(name, age , grade) VALUES ("李四", 20, "B");
INSERT INTO student(name, age , grade) VALUES ("王五", 21, "A");

CREATE TABLE scores (
	id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT ,
    score INT,
    FOREIGN KEY scores(student_id) REFERENCES student(id)
);

INSERT INTO scores(student_id, score) VALUES (1, 90) ,(2,85), (3,40)