import responseSchema from './response.json'
import Ajv from 'ajv'

const addResponseValidator = (validator: Ajv): void => {
  validator.addSchema(responseSchema, 'response')
  validator.getSchema('response')
}

export default addResponseValidator
