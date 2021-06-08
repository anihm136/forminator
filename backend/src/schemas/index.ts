import Ajv from 'ajv'
import addFormValidator from './validate_form'

const validator = new Ajv()
addFormValidator(validator)

export { validator }
