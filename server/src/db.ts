const PASSWORD_HASH = '1234'
function getPassword() {
  return PASSWORD_HASH
}
import { Pool, QueryResult } from 'pg'
const pool = new Pool({
  user: 'postgres',
  password: getPassword(),
  host: 'localhost',
  port: 5432,
  database: 'node_api_diplom',
})
export type gender = 'Male' | 'Female'
export type position = 'Developer' | 'Manager' | 'QA'
export type privateMessage = 'all' | 'sender' | 'receiver'
export type department =
  | 'Developer_department'
  | 'Manager_department'
  | 'QA_department'
export class queryDB {
  static async getEmployeeDepartmentLocation() {
    return await pool.query(`
    select 
    emp.employee_first_name,
    emp.employee_last_name,
    emp.employee_gender,
    emp."position",
    dep.department_name,
    loc.location_name,
    emp.birth_date,
    emp.joined_date,
    (CURRENT_DATE - emp.joined_date)/365 as years_at_work,
    (emp.joined_date - emp.birth_date)/365 as young_at_birth
    from employees_departments emp_d 
    join departments dep 
    on emp_d.department_id = dep.department_id 
    join employees emp 
    on emp_d.employee_id = emp.employee_id 
    join locations loc 
    ON loc.location_id = dep.location_id`)
  }
  static async getEmployeePrivateMessage(id: string, type: privateMessage) {
    let str = ';'
    if (!id.replace(/[^0-9]/g, '')) {
      return await pool.query('')
    }
    switch (type) {
      case 'all':
        str = `WHERE e_r.employee_id = ${id} OR e_s.employee_id = ${id};`
        break
      case 'receiver':
        str = `WHERE e_r.employee_id = ${id};`
        break
      case 'sender':
        str = `WHERE e_s.employee_id = ${id};`
        break
      default:
        break
    }
    return await pool.query(`
    select
    e_s."position" as sender_position,
    e_s.employee_first_name as sender_first_name,
    e_r."position" as recevier_position,
    e_r.employee_first_name  recevier_first_name,
    p_m.message_create_date,
    p_m.message_value,
    e_r.employee_id as recevier_id,
    e_s.employee_id as sender_id
    from employees_private_messages emp_p_m
    join employees e_r ON e_r.employee_id = emp_p_m.receiving_employee_id
    JOIN employees e_s ON e_s.employee_id = emp_p_m.sender_employee_id
    JOIN private_messages p_m ON p_m.private_message_id = emp_p_m.private_message_id
    ${str}`)
  }
  static async getEmployee(id: number) {
    if (Number.isInteger(+id)) {
      return await pool.query(`
    select * 
    from employees
    WHERE employee_id = ${id}
    `)
    }
    return await pool.query(``)
  }
  static async getEmployees() {
    return await pool.query(`
    select * 
    from employees
    `)
  }
  static async postNewEmployee(
    employee_first_name: string,
    employee_last_name: string,
    employee_gender: gender,
    position: position,
    birth_date: Date,
    joined_date: Date,
  ): Promise<QueryResult | {}> {
    try {
      if (
        [...arguments].includes('') ||
        !['Developer', 'Manager', 'QA'].includes(position) ||
        !['Male', 'Female'].includes(employee_gender)
      ) {
        throw 'error'
      }
      await pool.query(`
    insert into employees 
	  (
		  employee_first_name,
    	employee_last_name,
    	employee_gender,
    	"position",
    	birth_date,
    	joined_date
	  )
    values
	  (
		  '${employee_first_name}',
		  '${employee_last_name}',
		  '${employee_gender}',
		  '${position}',
		  '${birth_date.toISOString().slice(0, 10)}',
		  '${joined_date.toISOString().slice(0, 10)}'
	  );
    `)
      return await pool.query(`
      insert into employees_departments (employee_id,department_id)
      select employees.employee_id, departments.department_id
      from employees 
      join departments
      on departments.department_name::text = concat(employees."position",'_department')
      where employee_first_name = '${employee_first_name}' 
      and employee_last_name = '${employee_last_name}';
    `)
      //TODO: сделать запрос
    } catch (error) {
      return {}
    }
  }
  static async method2(department: department) {}
  static async method3(
    employee_first_name: string,
    employee_last_name: string,
    employee_gender: gender,
    position: position,
    birth_date: Date,
    joined_date: Date,
    department: department,
  ) {}
}
export default pool

type TPositions = 'Developer' | 'Manager' | 'QA'
type TDepartments<T extends TPositions> = `${T}_Department`
type TStage = 'Testing' | 'Developing' | 'Ready'
interface IUser {
  user_id: number
  name: string
  lastname: string
  position: TPositions
  tasks_id: ITasks['task_id'][]
  project_id: IProject['project_id'][]
  department: TDepartments<TPositions>
}
interface IDepartment {
  name: TDepartments<TPositions>
  description?: string
}
interface IProject {
  project_id: number
  name: string
  stage: TStage
  tasks_id: ITasks['task_id'][]
  description?: string
}
interface ITasks {
  task_id: number
  user_id: IUser['user_id']
  description: string
}
interface IFakeData {
  Users: IUser[]
  Projects: IProject[]
  TDepartments: IDepartment[]
  Tasks: ITasks[]
}
const fakeData: IFakeData = {
  Users: [
    {
      user_id: 1,
      name: 'Wu',
      lastname: 'Song',
      position: 'Developer',
      tasks_id: [1, 2, 4],
      project_id: [2],
      department: 'Developer_Department',
    },
    {
      user_id: 2,
      name: 'Alyssa',
      lastname: 'Lameda',
      position: 'QA',
      tasks_id: [3],
      project_id: [1, 2],
      department: 'QA_Department',
    },
    {
      user_id: 3,
      name: 'John',
      lastname: 'Cascade',
      position: 'Manager',
      tasks_id: [5, 6],
      project_id: [2],
      department: 'Manager_Department',
    },
  ],
  TDepartments: [
    { name: 'Developer_Department', description: 'develop new smth' },
    { name: 'Manager_Department', description: 'manage' },
    { name: 'QA_Department', description: 'test smth' },
  ],
  Projects: [
    {
      name: 'MVO',
      project_id: 1,
      stage: 'Ready',
      tasks_id: [1, 2, 3, 4],
      description: 'build minimal vipuklaya obolochka',
    },
    { name: 'Smth', project_id: 1, stage: 'Developing', tasks_id: [5, 6] },
  ],
  Tasks: [
    { task_id: 1, user_id: 1, description: 'emm first task' },
    { task_id: 2, user_id: 1, description: 'smth 2' },
    { task_id: 3, user_id: 2, description: 'smth 3' },
    { task_id: 4, user_id: 1, description: 'smth 4' },
    { task_id: 5, user_id: 3, description: 'smth 5' },
    { task_id: 6, user_id: 3, description: 'smth 6' },
  ],
}
