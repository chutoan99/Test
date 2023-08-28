import { Response } from 'express'
import createError from 'http-errors'

export const badRequest = (err: any, res: Response): Response => {
  const error = createError.BadRequest(err)
  return res.status(error.status).json({
    err: -1,
    mes: error.message
  })
}

export const internalServerError = (res: Response): Response => {
  const error = createError.InternalServerError()
  return res.status(error.status).json({
    err: -1,
    mes: error.message
  })
}

export const notFound = (req: Request, res: Response): Response => {
  const error = createError.NotFound('This route is not defined')
  return res.status(error.status).json({
    err: -1,
    mes: error.message
  })
}

export const notAuth = (err: any, res: Response): Response => {
  const error = createError.Unauthorized(err)
  return res.status(error.status).json({
    err: -1,
    mes: error.message
  })
}
