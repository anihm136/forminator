import { Request, NextFunction } from 'express'
import { CustomResponse } from '../types/response'
import { Form, FormType } from '../models/form'
import { validator } from '../schemas'
import { runtimeValidateForm } from '../utils'

const createForm = async (req: Request, res: CustomResponse, next: NextFunction): Promise<void> => {
  const validateForm = validator.getSchema('form')

  if (!validateForm) {
    res.status(500).send({ message: 'Unable to validate form' })
    return
  }

  const response = {
    code: 201,
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
export { createForm, runtimeValidateForm }
