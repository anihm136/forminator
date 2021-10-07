import { validator } from '../../../schemas'
import { FormType } from '../../../models/form'

function schemaValidateForm(body: FormType): boolean {
  const validateForm = validator.getSchema('form')

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
