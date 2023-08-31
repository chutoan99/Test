import connectDatabase from '~/configs/database'
import { BatchListResponse } from './index.response'
import { BatchList } from './index.type'

const BatchListService = {
  GetAll: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    try {
      const sqlQuery = `SELECT id, banner_image, title, end, start, createdAt, updatedAt FROM BatchLists`
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: BatchListResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as BatchList[]
      }

      const errorResponse: BatchListResponse = {
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

export default BatchListService
