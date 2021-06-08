import formSchema from './form.json';
import Ajv from 'ajv';

const addFormValidator = (validator: Ajv): void => {
    validator.addSchema(formSchema, 'form');
    validator.getSchema('form');
};

export default addFormValidator
