import { Schema, model } from 'mongoose'

interface MCQResponseType {
  question_id: number
  answer: number
}

interface SAQResponseType {
  question_id: number
  answer: string
}

type ResponseItemType = MCQResponseType | SAQResponseType

const multiChoiceResponseSchema = new Schema({
  _id: Number,
  question_id: {
    type: Number,
    required: true
  },
  answer: {
    type: Number,
    required: true
  }
})

const shortAnswerResponseSchema = new Schema({
  _id: Number,
  question_id: {
    type: Number,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const MCQResponse = model('MCQResponse', multiChoiceResponseSchema)
const SAQResponse = model('SAQResponse', shortAnswerResponseSchema)

export { MCQResponse, SAQResponse, MCQResponseType, SAQResponseType, ResponseItemType }
