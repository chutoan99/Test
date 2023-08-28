import connectDatabase from '~/configs/database'
import { NotifyResponse } from './index.response'
import { Notify } from './index.type'

const NotifyService = {
  GetAll: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT id, image, title, content, userid, seen, time, createdAt, updatedAt FROM Notifications`
    try {
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: NotifyResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as Notify[]
      }

      const errorResponse: NotifyResponse = {
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
  }
}

export default NotifyService
