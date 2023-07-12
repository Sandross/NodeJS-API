/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response, type NextFunction } from 'express'

export const contentType = (req: Request, res: Response, next: NextFunction) => {
  res.type('json')
  next()
}
