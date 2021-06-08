import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb'

interface FormType {
    _id: ObjectId,
    title: String,
    elements: Array<any> 
}

const formSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        elements: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true },
);

const Form = model<FormType>('Form', formSchema);
export { Form, FormType };
