DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees_departments;
DROP TABLE IF EXISTS employees_messages;
DROP TABLE IF EXISTS employees_tasks;
DROP TABLE IF EXISTS employees_messages;
DROP TABLE IF EXISTS employees;
DROP TYPE IF EXISTS Tgender;
--DROP TYPE IF EXISTS Tposition;
--DROP TYPE IF EXISTS Tdepartment;
CREATE TYPE T_EmployeePosition AS ENUM ('Developer','Manager','QA');
CREATE TYPE T_DepartmentName AS ENUM ('Developer_department','Manager_department','QA_department');
CREATE TYPE T_EmployeeGender AS ENUM ('Male','Female');
CREATE TYPE T_MessageType AS ENUM ('Private','Task');
CREATE TYPE T_TaskComplexity AS ENUM ('eazy','medium','hard');
CREATE TYPE T_TaskStage AS ENUM ('start','fulfilled 25%','fulfilled 50%','fulfilled 75%','fulfilled','closed');
CREATE TABLE employess(
	employee_id serial PRIMARY KEY,
	employee_first_name VARCHAR(40) NOT NULL,
	employee_last_name VARCHAR(40) NOT NULL,
	employee_gender T_EmployeeGender NOT NULL,
	position T_EmployeePosition NOT NULL,
	birth_date DATE NOT NULL,
	joined_date DATE NOT NULL
);
CREATE TABLE locations(
	location_id serial PRIMARY KEY,
	location_name VARCHAR(40) NOT NULL,
);
CREATE TABLE messages(
	message_id serial PRIMARY KEY ,
	receiver_employee_id INT NOT NULL REFERENCES empoyess(employee_id) ON DELETE CASCADE,
	task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
	message_create_date DATE NOT NULL,
	message_value TEXT NOT NULL,
	message_type T_MessageType NOT NULL,
);
CREATE TABLE tasks(
	task_id serial PRIMARY KEY ,
	complexity INT NOT NULL REFERENCES empoyess(employee_id) ON DELETE CASCADE,
	task_stage T_TaskStage NOT NULL,
	expired_date DATE NOT NULL,
	task_description TEXT NOT NULL,
	task_created_date DATE NOT NULL,
);
CREATE TABLE projects(
	project_id serial PRIMARY KEY ,
	project_description TEXT NOT NULL,
	project_stage T_TaskStage NOT NULL,
	project_start_date DATE NOT NULL,
);
CREATE TABLE departments(
	department_id serial PRIMARY KEY ,
	department_name T_DepartmentName NOT NULL,
	project_stage T_TaskStage NOT NULL,
	project_start_date DATE NOT NULL,
);
--CREATE TABLE users(
--    user_id serial PRIMARY KEY,
--	name VARCHAR(20) NOT NULL,
--	lastname VARCHAR(20) NOT NULL,
--	position Tposition NOT NULL,
--	department Tdepartment NOT NULL
--);
--CREATE TABLE tasks(
--	task_id serial PRIMARY KEY,
--	user_id INT NOT NULL,
--	date_create DATE DEFAULT CURRENT_DATE,
--	description TEXT NOT NULL
--);
--INSERT INTO users ("name","lastname","position",department) VALUES 
--('Olga','Bobnova','QA','QA_department'),
--('Maria','Lerna','Developer','Developer_department'),
--('Jan','Su','Manager','Manager_department');
--INSERT INTO tasks (user_id,description) VALUES (1,'fix smth');
--SELECT * FROM users;
--SELECT * FROM tasks;

--CREATE TABLE product (
--  product_id serial PRIMARY KEY  -- implicit primary key constraint
--, product    text NOT NULL
--, price      numeric NOT NULL DEFAULT 0
--);

--CREATE TABLE bill (
--  bill_id  serial PRIMARY KEY
--, bill     text NOT NULL
--, billdate date NOT NULL DEFAULT CURRENT_DATE
--);

--CREATE TABLE bill_product (
--  bill_id    int REFERENCES bill (bill_id) ON UPDATE CASCADE ON DELETE CASCADE
--, product_id int REFERENCES product (product_id) ON UPDATE CASCADE
--, amount     numeric NOT NULL DEFAULT 1
--, CONSTRAINT bill_product_pkey PRIMARY KEY (bill_id, product_id)  -- explicit pk
--);
-- 1 - диаграмма вариантов (прецендентов)
-- 2 - диаграмма деятельности для каждого прецендента
-- 3 - диаграмма классов
-- 4 - диаграмма компонентов
-- 5 - диаграмма развертывания