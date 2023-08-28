import { Request, Response } from 'express'
import AuthService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const AuthController = {
  Login: (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(200).json({
          err: 1,
          mess: 'missing input'
        })
      }
      AuthService.login(email, password).then((response) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default AuthController
