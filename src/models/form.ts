import { Schema, model } from 'mongoose'
import { ObjectId } from 'mongodb'
import { QuestionType } from './question'

interface FormType {
  _id: ObjectId
  title: string
  elements: Array<QuestionType>
}

const formSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
)

const Form = model<FormType>('Form', formSchema)
export { Form, FormType }
