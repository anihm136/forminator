import express, { Application, Request, NextFunction } from 'express'
import { CustomResponse } from './types/response'
import createForm from './handlers/create'
import { writeResponse } from './middleware/response'

const app: Application = express()
app.set('env', process.env.RUN_ENV || 'development')

// Middleware
app.use(express.json())

app.post('/form/create', createForm)
app.get('/form/:formToken', (req: Request, res: CustomResponse, next: NextFunction) => {
  res.custom_data.message = `Returns the form with token ${req.params.formToken}`
  next()
})

app.use(writeResponse)

export default app
