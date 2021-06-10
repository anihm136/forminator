import express, { Application, Request, NextFunction } from 'express'
import { CustomResponse } from './types/response'
import createForm from './handlers/create'
import { writeResponse } from './middleware/response'
import mongoose from 'mongoose'

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

const pwd = process.env.DB_PASS
const user = process.env.DB_USER
const dbName = process.env.DB_NAME
mongoose
  .connect(
    `mongodb+srv://${user}:${pwd}@forminator-data.wvxlh.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(process.env.PORT)
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
