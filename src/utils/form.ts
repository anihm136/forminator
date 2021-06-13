import { FormType } from '../models/form'
import { MCQ, SAQ } from '../models/question'

const runtimeValidateForm = (form: FormType): boolean => {
  for (const [idx, question] of form.elements.entries()) {
    if (question.type == 2 && question.correct >= question.choices.length) {
      return false
    }
    switch (question.type) {
      case 1:
        form.elements[idx] = new SAQ(question)
        break
      case 2:
        form.elements[idx] = new MCQ(question)
        break
    }
  }

  return true
}

export { runtimeValidateForm }
