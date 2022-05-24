import express, { Application, NextFunction, Request, Response } from 'express'
import { router as UserRouter } from '../routes/user.routes'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 3001

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', UserRouter)
app.listen(PORT, () => {
  console.log(`Server start at ${PORT}`)
})
