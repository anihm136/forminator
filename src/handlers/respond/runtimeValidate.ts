import { FormType } from '../../models/form'
import { ResponseType } from '../../models/response'
import { MCQType } from '../../models/question'

function runtimeValidateResponse(response: ResponseType, form: FormType): boolean {
  for (const responseItem of response.answers) {
    const questionId = responseItem.question_id
    if (questionId < 0 || questionId >= form.elements.length) {
      return false
    }
    const question = form.elements[questionId]
    switch (question.type) {
      case 1:
        if (typeof responseItem.answer !== 'string') {
          return false
        }
        break
      case 2:
        if (typeof responseItem.answer !== 'number') {
          return false
        }
        if (
          responseItem.answer < 0 ||
          responseItem.answer >= (question as MCQType).choices.length
        ) {
          return false
        }

        break
    }
  }

  return true
}

export default runtimeValidateResponse
