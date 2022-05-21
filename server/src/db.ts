const PASSWORD_HASH = '1234'
function getPassword() {
  return PASSWORD_HASH
}
import { Pool } from 'pg'
const pool = new Pool({
  user: 'postgres',
  password: getPassword(),
  host: 'localhost',
  port: 5432,
  database: 'node_api_diplom',
})

export async function getUser() {
  return await pool.query(
    'SELECT name, lastname, position, department FROM USER',
  )
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
