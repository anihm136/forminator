import { FormType } from '../../../models/form'

function runtimeValidateForm(form: FormType): boolean {
  for (const question of form.elements) {
    if ('choices' in question) {
      if (question.correct >= question.choices.length) {
        return false
      }
    }
  }

  return true
}

export default runtimeValidateForm
