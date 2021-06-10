import { Request, NextFunction } from 'express'
import { CustomResponse } from '../types/response'
import { Form, FormType } from '../models/form'
import { MCQ, SAQ } from '../models/question'
import { validator } from '../schemas'

const runtimeValidateForm = (form: FormType) => {
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

const createForm = async (req: Request, res: CustomResponse, next: NextFunction): Promise<void> => {
  const validateForm = validator.getSchema('form')

  if (!validateForm) {
    res.status(500).send({ message: 'Unable to validate form' })
    return
  }

  const response = {
    code: 200,
    message: 'Form created',
    form_id: ''
  }

  const form = new Form(req.body)
  if (!validateForm(req.body) || !runtimeValidateForm(form)) {
    response.code = 400
    response.message = 'Form invalid'
    res.custom_data = response
    next()
  } else {
    form.save((err: any, self: FormType): void => {
      if (err) {
        response.code = 400
        response.message = 'Form not created'
      }
      response.form_id = self._id.toString()
      res.custom_data = response
      next()
    })
  }
}

export default createForm
