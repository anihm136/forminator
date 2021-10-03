import { Request, NextFunction } from 'express'
import { MCQResponse, SAQResponse } from '../../models/response_item'
import { CustomResponse } from '../../types/response'
import { Response, ResponseType } from '../../models/response'
import { Form } from '../../models/form'
import { ObjectId } from 'mongodb'
import runtimeValidateResponse from './runtimeValidate'
import schemaValidateResponse from './schemaValidate'

const respondToForm = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
): Promise<void> => {
  const response = {
    code: 201,
    message: 'Response created',
    response_id: ''
  }

  if (!schemaValidateResponse(req.body)) {
    console.log('Invalid schema')
    response.code = 400
    response.message = 'Response invalid'
    res.custom_data = response
    next()
    return
  }

  const userResponse = new Response(req.body)
  const formId = req.params.formToken
  const formBeingAnswered = await Form.findOne({ _id: formId })
  if (formBeingAnswered === null) {
    response.code = 400
    response.message = 'Form does not exist'
    res.custom_data = response
    next()
    return
  }
  userResponse.form_id = new ObjectId(formId)

  if (!runtimeValidateResponse(userResponse, formBeingAnswered)) {
    console.log('Invalid answer')
    response.code = 400
    response.message = 'Response invalid'
    res.custom_data = response
    next()
    return
  }

  for (const [idx, responseItem] of userResponse.answers.entries()) {
    switch (formBeingAnswered.elements[responseItem.question_id].type) {
      case 1:
        userResponse.answers[idx] = new SAQResponse(responseItem)
        break
      case 2:
        userResponse.answers[idx] = new MCQResponse(responseItem)
        break
    }
  }

  userResponse.save((err: any, self: ResponseType): void => {
    if (err) {
      response.code = 400
      response.message = 'Form not created'
    } else {
      response.response_id = self._id.toString()
    }
    res.custom_data = response
    next()
  })
}

export default respondToForm
export { respondToForm, runtimeValidateResponse }
