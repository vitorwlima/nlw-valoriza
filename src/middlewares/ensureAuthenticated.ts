import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization.replace('Bearer ', '')

  if (!token) return response.status(401).end()

  try {
    const userInfo = verify(token, process.env.ENCRYPT)

    request.user_id = userInfo.sub as string

    return next()
  } catch {
    return response.status(401).end()
  }
}
