import { Request, Response } from 'express'
import joi from 'joi'
import { email, password } from '~/helpers/validate'
import { internalServerError, badRequest } from '~/middleWares/handle_errors'
import AuthService from './index.service'

const AuthClientController = {
  Register: async (req: any, res: Response) => {
    try {
      const { error } = joi.object({ email, password }).validate({
        email: req.body.email,
        password: req.body.password
      })

      if (error) return badRequest(error.details[0]?.message, res)

      const payload = req.body
      const response = await AuthService.Register(payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(200).json({
          err: 1,
          mess: 'missing input'
        })
      }
      const response = await AuthService.Login(email, password)
      res.cookie('refreshToken', response.newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
      delete response.newRefreshToken
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  forgotPassword: async (req: any, res: Response) => {
    try {
      const { email } = req.query
      if (!email) throw new Error('Missing email')
      const response = await AuthService.ForgotPassword(email)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  resetPassword: async (req: any, res: Response) => {
    try {
      const { password, token, email } = req.body
      if (!password || !token || !email) throw new Error('Missing imputs')
      const response = await AuthService.ResetPassword(password, token, email)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  refreshAccessToken: async (req: any, res: Response) => {
    try {
      const cookie = req.cookies
      if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
      const response = await AuthService.RefreshAccessToken(cookie)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  logout: async (req: any, res: Response) => {
    try {
      const cookie = req.cookies
      if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
      const response = await AuthService.Logout(cookie)
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  loginGoogle: async (req: Request, res: Response) => {
    try {
      res.redirect('/')
    } catch (error) {
      return internalServerError(res)
    }
  },

  loginFacebook: async (req: Request, res: Response) => {
    try {
      res.redirect('/')
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default AuthClientController
