import { Schema, model } from 'mongoose'

interface MCQType {
  question: string
  type: number
  choices: Array<string>
  correct?: number
}

interface SAQType {
  question: string
  type: number
}

const multiChoiceQuestionSchema = new Schema({
  _id: Number,
  question: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  choices: {
    type: [String],
    required: true
  },
  correct: {
    type: Number,
    default: -1
  }
})

const shortAnswerQuestionSchema = new Schema({
  _id: Number,
  question: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  }
})

const MCQ = model('MCQ', multiChoiceQuestionSchema)
const SAQ = model('SAQ', shortAnswerQuestionSchema)

export { MCQ, SAQ, MCQType, SAQType }
