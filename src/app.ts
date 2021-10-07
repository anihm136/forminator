import express, { Application } from 'express'
import createForm from './handlers/form/create'
import respondToForm from './handlers/response/create'
import readForm from './handlers/form/read'
import { writeResponse } from './middleware/response'

const app: Application = express()
app.set('env', process.env.RUN_ENV || 'development')

// Middleware
app.use(express.json())

app.post('/form/create', createForm)
app.get('/form/:formToken', readForm)

app.post('/response/:formToken', respondToForm)

app.use(writeResponse)

export default app
