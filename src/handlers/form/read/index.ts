import { Request, NextFunction } from 'express'
import { CustomResponse } from '../../../types/response'
import { Form } from '../../../models/form'
import { ObjectId } from 'mongodb'

const readForm = async (req: Request, res: CustomResponse, next: NextFunction): Promise<void> => {
  const response = {
    code: 200,
    message: 'Form retrieved',
    form: {}
  }

  const formId = req.params.formToken
  if (!formId) {
    response.code = 400
    response.message = 'No form ID provided'
    res.custom_data = response
    next()
    return
  }
  if (!ObjectId.isValid(formId)) {
    response.code = 400
    response.message = 'Invalid form ID'
    res.custom_data = response
    next()
    return
  }
  const form = await Form.findOne({ _id: formId })
  if (!form) {
    response.code = 400
    response.message = 'No form with given ID'
    res.custom_data = response
    next()
    return
  }
  response.form = form
  res.custom_data = response
  next()
}

export default readForm
