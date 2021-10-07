import { Request, NextFunction } from 'express'
import { MCQ, SAQ } from '../../../models/question'
import { CustomResponse } from '../../../types/response'
import { Form, FormType } from '../../../models/form'
import runtimeValidateForm from './runtimeValidate'
import schemaValidateForm from './schemaValidate'

const createForm = async (req: Request, res: CustomResponse, next: NextFunction): Promise<void> => {
  const response = {
    code: 201,
    message: 'Form created',
    form_id: ''
  }

  if (!schemaValidateForm(req.body)) {
    response.code = 400
    response.message = 'Form invalid'
    res.custom_data = response
    next()
    return
  }

  const form = new Form(req.body)
  if (!runtimeValidateForm(form)) {
    response.code = 400
    response.message = 'Form invalid'
    res.custom_data = response
    next()
    return
  }

  for (const [idx, question] of form.elements.entries()) {
    switch (question.type) {
      case 1:
        form.elements[idx] = new SAQ(question)
        break
      case 2:
        form.elements[idx] = new MCQ(question)
        break
    }
  }

  form.save((err: any, self: FormType): void => {
    if (err) {
      response.code = 400
      response.message = 'Form not created'
    } else {
      response.form_id = self._id.toString()
    }
    res.custom_data = response
    next()
  })
}

export default createForm
export { createForm, runtimeValidateForm }
