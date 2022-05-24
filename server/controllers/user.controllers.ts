import { gender, position, privateMessage, queryDB } from '../src/db'
import * as core from 'express-serve-static-core'
import { Request, Response } from 'express'
import { QueryResult } from 'pg'
class UserController {
  async createUser(
    //уточнил стандартный интерфейс
    req: Request<
      core.ParamsDictionary,
      any,
      {
        employee_first_name: string
        employee_last_name: string
        employee_gender: gender
        position: position
        birth_date: Date
        joined_date: Date
      }
    >,
    res: Response,
  ) {
    const newUser = await queryDB.postNewEmployee(
      req.body.employee_first_name,
      req.body.employee_last_name,
      req.body.employee_gender,
      req.body.position,
      new Date(2000, 2, 2),
      new Date(2019, 1, 2),
    )
    res.status(newUser.hasOwnProperty('rowCount') ? 201 : 400).end()
  }
  async authUser(
    req: Request<
      core.ParamsDictionary,
      any,
      {
        employee_first_name: string
        employee_last_name: string
      }
    >,
    res: Response,
  ) {}
  async updateUser(req: Request, res: Response) {
    res.json()
  }
  async deleteUser(req: Request, res: Response) {
    res.json()
  }
  async getOneUser(req: Request & { params: { id: number } }, res: Response) {
    res.json((await queryDB.getEmployee(req.params.id)).rows)
  }
  async getPrivateMessages(
    req: Request & { params: { id: string; type: privateMessage } },
    res: Response,
  ) {
    res.json(await MessageController.getPrivateMessages(req, res))
  }
  async getUserS(req: Request, res: Response) {
    res.json((await queryDB.getEmployees()).rows)
  }
}
class MessageController {
  static async getPrivateMessages(
    req: Request & { params: { id: string; type: privateMessage } },
    res: Response,
  ) {
    return (
      await queryDB.getEmployeePrivateMessage(req.params.id, req.params.type)
    ).rows
  }
}
const userController = new UserController()
export default userController
