import express, { Application, NextFunction, Request, Response } from 'express'
import { router as UserRouter } from '../routes/user.routes'
import pool, { getUser } from './db'

const PORT = process.env.PORT || 3001

const app: Application = express()

app.use('/api', UserRouter)
app.listen(PORT, () => {
  console.log(`Server start at ${PORT}`)
})
