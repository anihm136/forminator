import { Config } from './types/config'

const port = parseInt(process.env.port || '3000')
const db_user = process.env.DB_USER || ''
const db_pass = process.env.DB_PASS || ''
const db_name = process.env.DB_NAME || ''
const db_base = process.env.DB_BASE || 'localhost'

const config: Config = {
  port: port,
  db_user: db_user,
  db_pass: db_pass,
  db_name: db_name,
  db_base: db_base
}
export default config
