import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { notAuth } from './handle_errors'

import dotenv from 'dotenv'
dotenv.config()

export const generateAccessToken = ({ userid, email, role }: { userid: any; email: string; role: string }) => {
  return jwt.sign({ userid, email, role }, process.env.SECRET_KEY as string, {
    expiresIn: '1d'
  })
}

export const generateRefreshToken = ({ userid, email }: { userid: any; email: string }) => {
  return jwt.sign({ userid, email }, process.env.SECRET_KEY as string, {
    expiresIn: '7d'
  })
}

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization
  if (!token) return notAuth('Require authorization', res)
  const accessToken = token.split(' ')[1]
  jwt.verify(accessToken, process.env.SECRET_KEY as jwt.Secret, (err: any, decode: any) => {
    if (err) {
      const isChecked = err instanceof TokenExpiredError
      if (!isChecked) return notAuth('Access token invalid', res)
      if (isChecked) return notAuth('Access token expired', res)
    }
    req.user = decode
    next()
  })
}

export const isShopAdmin = (req: any, res: Response, next: NextFunction) => {
  const { role } = req.user
  if (role !== 'shop_Admin') return notAuth('Require role shop_Admin', res)
  req.shop = req.user
  next()
}
