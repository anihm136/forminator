import Ajv from 'ajv'
import addFormValidator from './validate_form'
import addResponseValidator from './validate_response'

const validator = new Ajv()
addFormValidator(validator)
addResponseValidator(validator)

export { validator }
