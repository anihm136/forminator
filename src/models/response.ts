import { Schema, model } from 'mongoose'
import { ObjectId } from 'mongodb'
import { ResponseItemType } from './response_item'

interface ResponseType {
  _id: ObjectId
  form_id: ObjectId
  answers: Array<ResponseItemType>
}

const responseSchema = new Schema(
  {
    form_id: {
      type: ObjectId,
      required: true
    },
    answers: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
)

const Response = model<ResponseType>('Response', responseSchema)
export { Response, ResponseType }
