import { Config } from './types/config'

let config: Config
const port = parseInt(process.env.port || '3000')
const db_user = process.env.DB_USER || 'admin'
const db_pass = process.env.DB_PASS || ''
const db_name = process.env.DB_NAME || 'db'

switch (process.env.RUN_ENV) {
  case 'production':
    config = {
      port: port,
      db_user: db_user,
      db_pass: db_pass,
      db_name: db_name
    }
    break
  case 'development':
  default:
    config = {
      port: port,
      db_user: db_user,
      db_pass: db_pass,
      db_name: db_name
    }
    break
}
export default config
