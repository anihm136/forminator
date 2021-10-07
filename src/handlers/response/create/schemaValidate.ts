import { validator } from '../../../schemas'
import { ResponseType } from '../../../models/response'

function schemaValidateForm(body: ResponseType): boolean {
  const validateForm = validator.getSchema('response')

  if (!validateForm) {
    return false
  }
  if (validateForm(body)) {
    // TODO: this is needed because of a typing issue, look into fix
    return true
  }
  return false
}

export default schemaValidateForm
