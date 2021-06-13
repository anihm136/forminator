import mongoose from 'mongoose'
import app from './app'
import config from './config'

const db_user = config.db_user
const db_pass = config.db_pass
const db_name = config.db_name
const base_url = process.env.DB_BASE || 'localhost'
const db_url = `mongodb+srv://${db_user}:${db_pass}@${base_url}/${db_name}`

console.log(db_url)

mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(process.env.PORT)
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
