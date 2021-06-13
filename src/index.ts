import mongoose from 'mongoose'
import app from './app'
import config from './config'

const db_url = `mongodb+srv://${config.db_user}:${config.db_pass}@${config.db_base}/${config.db_name}`

mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
