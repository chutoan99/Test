const db = require('../../models/index')
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { generateUserid, generateShopid } from '~/utils/gennerateNumber'
import { generateAccessToken, generateRefreshToken } from '~/middleWares/jwt'
import sendEmail from '~/middleWares/sendEmail'
import templateResetPassword from '~/templates/reset'

const hashPassWord = (password: any) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
}
const AuthService = {
  Register: async (payload: any) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          userid: generateUserid(),
          shopid: generateShopid(),
          password: hashPassWord(payload?.password),
          sex: 0,
          role: 'client',
          name: payload?.name,
          address: payload?.address
        }
      })
      return {
        err: response[1] ? 0 : 1,
        msg: response[1] ? 'register is SuccessFully' : 'email is used',
        response: response[1] ? response : null
      }
    } catch (error) {
      throw new Error('register is Failed.')
    }
  },
  // B1 KIỂM TRA MẬT KHẨU ĐÚNG HAY KHÔNG
  // B2 TẠO ACCESSTOKEN (Xác thực người dùng, quân quyên người dùng) VÀ REFRESHTOKEN()
  // B3 LƯU REFRESHTOKEN VÀO DB VÀ COOKIE
  Login: async (email: any, password: any) => {
    try {
      const response = await db.User.findOne({
        where: {
          email
        },
        raw: true,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      })
      if (response && bcrypt.compareSync(password, response.password)) {
        const accessToken = generateAccessToken({
          userid: response.userid,
          email: response.email,
          role: response.role
        })

        const newRefreshToken = generateRefreshToken({
          userid: response.userid,
          email: response.email
        })

        await db.User.update(
          { refreshToken: newRefreshToken, not_new_user: response.not_new_user === null ? true : false },
          { where: { email }, attributes: { exclude: ['password', 'refreshToken'] } }
        )
        return {
          err: 0,
          msg: 'Login Success',
          access_token: accessToken,
          response: response,
          newRefreshToken
        }
      } else {
        return {
          err: 2,
          msg: 'Email or Password is wrong',
          response: null,
          access_token: null
        }
      }
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  },
  // Client gửi email
  // Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
  // Client check mail => click link
  // Client gửi api kèm token
  // Check token có giống với token mà server gửi mail hay không
  // Change password
  ForgotPassword: async (email: any) => {
    try {
      const user = await db.User.findOne({
        where: { email: email }
      })
      if (!user) {
        return {
          err: -1,
          msg: 'cannot not found email'
        }
      }
      const resetToken = crypto.randomBytes(32).toString('hex')
      const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
      const passwordResetExpires = Date.now() + 15 * 60 * 1000
      const UserUpdated = await db.User.update(
        { passwordResetToken: passwordResetToken, passwordResetExpires: passwordResetExpires },
        { where: { email: email } }
      )
      const response = await sendEmail(email, templateResetPassword(email, resetToken))
      return {
        err: response ? 0 : 2,
        msg: response ? 'ok' : 'Email not ',
        response: response ? response : null
      }
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  },

  // check thời gian token còn hạn hay không
  // kiểm tra thời gian lưu trong db và thời gian thực xem tojen có hết hạn hay chưa
  ResetPassword: async (password: any, token: any, email: any) => {
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await db.User.findOne({ where: { email: email, passwordResetToken: passwordResetToken } })
    if (!user) {
      return {
        err: 2,
        msg: 'Invalid reset token'
      }
    }

    if (user.passwordResetExpires - Date.now() <= 0) {
      return {
        err: 2,
        msg: 'token hết hạn'
      }
    }
    const updatePassword = hashPassWord(password)
    const response = await db.User.update(
      { password: updatePassword, passwordResetToken: '', passwordChangedAt: Date.now(), passwordResetExpires: '' },
      { where: { email } }
    )

    return {
      err: response ? 0 : 2,
      msg: response ? 'Updated password' : 'Email or Password is wrong'
    }
  },
  // Check xem có token hay không
  // check refreshToken và trong db có giống nhau hay không, nếu giống thì tạo newAccessToken
  RefreshAccessToken: async (cookie: any) => {
    const decode = jwt.verify(cookie.refreshToken, process.env.SECRET_KEY as jwt.Secret) as JwtPayload
    const response = await db.User.findOne({
      where: {
        userid: decode?.userid,
        refreshToken: cookie.refreshToken
      }
    })
    const newAccessToken = generateAccessToken({
      userid: response.userid,
      email: response.email,
      role: response.role
    })
    return {
      err: response ? 0 : 2,
      msg: response ? 'ok' : 'Refresh token not matched',
      accessToken: newAccessToken ? newAccessToken : null
    }
  },

  Logout: async (cookie: any) => {
    try {
      // Xóa refresh token ở db
      const decode = jwt.verify(cookie.refreshToken, process.env.SECRET_KEY as jwt.Secret) as JwtPayload
      const response = await db.User.update({ refreshToken: '' }, { where: { userid: decode.userid } })
      return {
        err: response ? 0 : 2,
        msg: response ? 'Logout is done' : 'Logout is fail'
      }
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  },

  LoginGoogle: (token: any) => {
    try {
      jwt.verify(token, '', function (err: any, decoded: any) {
        if (err) {
          console.log('Giải mã thất bại: ', err)
        } else {
          console.log('Payload giải mã')
        }
      })
      return {}
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  },

  LoginFacebook: (token: any) => {
    try {
      jwt.verify(token, '', function (err: any, decoded: any) {
        if (err) {
          console.log('Giải mã thất bại: ', err)
        } else {
          console.log('Payload giải mã')
        }
      })
      return {}
    } catch (error) {
      throw new Error('Login is Failed.')
    }
  }
}
export default AuthService
