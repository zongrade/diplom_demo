DROP TABLE IF EXISTS employees_departments;
DROP TABLE IF EXISTS employees_projects;
DROP TABLE IF EXISTS employees_tasks;
DROP TABLE IF EXISTS employees_private_messages;
DROP TABLE IF EXISTS task_public_messages;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS private_messages;
DROP TABLE IF EXISTS public_messages;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS employees;
DROP TYPE IF EXISTS T_EmployeePosition;
DROP TYPE IF EXISTS T_DepartmentName;
DROP TYPE IF EXISTS T_EmployeeGender;
DROP TYPE IF EXISTS T_MessageType;
DROP TYPE IF EXISTS T_TaskComplexity;
DROP TYPE IF EXISTS T_TaskStage;
CREATE TYPE T_EmployeePosition AS ENUM ('Developer','Manager','QA');
CREATE TYPE T_DepartmentName AS ENUM ('Developer_department','Manager_department','QA_department');
CREATE TYPE T_EmployeeGender AS ENUM ('Male','Female');
CREATE TYPE T_MessageType AS ENUM ('Private','Task');
CREATE TYPE T_TaskComplexity AS ENUM ('eazy','medium','hard');
CREATE TYPE T_TaskStage AS ENUM ('start','fulfilled 25%','fulfilled 50%','fulfilled 75%','fulfilled','closed');
CREATE TABLE employees(
	employee_id serial PRIMARY KEY,
	employee_first_name VARCHAR(40) NOT NULL UNIQUE,
	employee_last_name VARCHAR(40) NOT NULL UNIQUE,
	employee_gender T_EmployeeGender NOT NULL,
	position T_EmployeePosition NOT NULL,
	birth_date DATE NOT NULL,
	joined_date DATE NOT NULL
);
CREATE TABLE locations(
	location_id serial PRIMARY KEY,
	location_name VARCHAR(40) NOT NULL
);
CREATE TABLE tasks(
	task_id serial PRIMARY KEY ,
	complexity T_TaskComplexity NOT NULL,
	task_stage T_TaskStage NOT NULL,
	expired_date DATE NOT NULL,
	task_description TEXT NOT NULL,
	task_created_date DATE NOT NULL
);
CREATE TABLE private_messages(
	private_message_id serial PRIMARY KEY ,
	message_create_date DATE NOT NULL,
	message_value TEXT NOT NULL
);
CREATE TABLE public_messages(
	public_message_id serial PRIMARY KEY ,
	message_create_date DATE NOT NULL,
	message_value TEXT NOT NULL
);
CREATE TABLE projects(
	project_id serial PRIMARY KEY ,
	project_description TEXT NOT NULL,
	project_stage T_TaskStage NOT NULL,
	project_start_date DATE NOT NULL
);
CREATE TABLE departments(
	department_id serial PRIMARY KEY,
	department_name T_DepartmentName NOT NULL,
	location_id INT NOT NULL REFERENCES locations(location_id) ON DELETE CASCADE
);
CREATE TABLE employees_departments(
	employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
	department_id INT REFERENCES departments(department_id) ON DELETE CASCADE,
	CONSTRAINT employees_departments_pkey PRIMARY KEY (employee_id, department_id)
);
CREATE TABLE employees_projects(
	employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
	project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
	CONSTRAINT employees_projects_pkey PRIMARY KEY (employee_id, project_id)
);
CREATE TABLE employees_tasks(
	employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
	task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
	CONSTRAINT employees_tasks_pkey PRIMARY KEY (employee_id, task_id)
);
CREATE TABLE employees_private_messages(
	sender_employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
	receiving_employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
	private_message_id INT REFERENCES private_messages(private_message_id) ON DELETE CASCADE,
	CONSTRAINT employees_private_messages_pkey PRIMARY KEY (sender_employee_id, receiving_employee_id, private_message_id)
);
CREATE TABLE task_public_messages(
	public_message_id INT REFERENCES public_messages(public_message_id) ON DELETE CASCADE,
	task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
	CONSTRAINT task_public_messages_pkey PRIMARY KEY (public_message_id, task_id)
);
INSERT INTO employees (employee_first_name, employee_last_name, employee_gender, position, birth_date, joined_date) VALUES ('Jan','Lergons','Male','Developer', '2000-02-01', CURRENT_DATE - 900),('Olfa','Urta','Female','QA', '1998-02-01', CURRENT_DATE - 400),('Urg','Lockhart','Male','Manager', '1201-01-01', CURRENT_DATE - 9000);
INSERT INTO locations (location_name) VALUES ('London'),('Moscow'),('Berlin'),('Saint-Petersburg');
INSERT INTO projects (project_description,project_stage,project_start_date) VALUES ('Smth aboit first project','start',CURRENT_DATE),('Smth aboit second project','start',CURRENT_DATE-1),('third project','start',CURRENT_DATE-5);
INSERT INTO departments (department_name,location_id) VALUES ('Developer_department',2),('Manager_department',4),('QA_department',3);
INSERT INTO tasks (complexity,task_stage,expired_date,task_description,task_created_date) VALUES ('eazy','fulfilled 25%',CURRENT_DATE+15,'first task',CURRENT_DATE);
INSERT INTO private_messages (message_create_date,message_value) VALUES (CURRENT_DATE,'help with smth'),(CURRENT_DATE-2,'help with smth2'),(CURRENT_DATE-3,'help with smth3'),(CURRENT_DATE-4,'help with smth4');
INSERT INTO public_messages (message_create_date,message_value) VALUES (CURRENT_DATE,'fix this, it''s important');
INSERT INTO employees_departments (employee_id,department_id) VALUES (1,1), (2,3);
INSERT INTO employees_projects (employee_id,project_id) VALUES (1,1), (2,1);
INSERT INTO employees_tasks (employee_id,task_id) VALUES (2,1);
INSERT INTO employees_private_messages (sender_employee_id,receiving_employee_id,private_message_id) VALUES (1,2,1),(2,3,2),(3,2,3),(3,1,4);
INSERT INTO task_public_messages (public_message_id,task_id) VALUES (1,1);

-- Выборка данных по Пользователь->Отдел->Местонахождение
--select 
--emp.employee_first_name,
--emp.employee_last_name,
--emp.employee_gender,
--emp."position",
--dep.department_name,
--loc.location_name,
--emp.birth_date,
--emp.joined_date,
--(CURRENT_DATE - emp.joined_date)/365 as years_at_work,
--(emp.joined_date - emp.birth_date)/365 as young_at_birth
--from employees_departments emp_d 
--join departments dep 
--on emp_d.department_id = dep.department_id 
--join employees emp 
--on emp_d.employee_id = emp.employee_id 
--join locations loc 
--ON loc.location_id = dep.location_id