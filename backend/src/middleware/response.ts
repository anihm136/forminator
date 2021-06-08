import { Request } from 'express'
import { CustomResponse } from '../types/response'

export const writeResponse = (_: Request, res: CustomResponse) => {
	const res_code = res.custom_data.code
	delete res.custom_data.code
	res.status(res_code).json(res.custom_data)
}
