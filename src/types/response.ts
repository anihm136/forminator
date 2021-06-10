import { Response } from 'express'

export interface CustomResponse extends Response {
  custom_data?: any
}
