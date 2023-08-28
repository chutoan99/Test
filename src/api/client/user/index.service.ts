import connectDatabase from '~/configs/database'
import { UserResponse } from './index.response'
import { User } from './index.type'
const cloudinary = require('cloudinary').v2

const UserService = {
  GetCurrent: async (userid: any) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `
    SELECT sex, userid, shopid, email, name, address, birthday, phone, avatar, role, not_new_user, createdAt, updatedAt 
    FROM Users 
    WHERE userid = ?
    Limit 1`
    try {
      const [user, _]: [any, any] = await db.query(sqlQuery, [userid])
      const response: User = user.length ? user[0] : null
      const successResponse: UserResponse = {
        err: 0,
        msg: 'OK',
        response: response as User
      }
      const errorResponse: UserResponse = {
        err: 1,
        msg: 'Error',
        response: null
      }
      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  },

  UpdateCurrent: async (userid: any, payload: any) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `
    SELECT sex, userid, shopid, email, name, address, birthday, phone, avatar, role, not_new_user, createdAt, updatedAt 
    FROM Users 
    WHERE userid = ?`
    try {
      // const response = await db.User.update(
      //   {
      //     sex: +payload?.sex,
      //     email: payload?.email,
      //     name: payload?.name,
      //     address: payload?.address,
      //     phone: +payload?.phone,
      //     birthday: payload?.birthday,
      //     avatar: payload.avatar
      //   },
      //   { where: { userid: userid } }
      // )
      // return {
      //   err: response ? 0 : 1,
      //   msg: response ? 'OK' : 'Failed to  User.'
      // }
    } catch (error) {
      throw new Error('Failed to Update User')
    }
  }
}

export default UserService
