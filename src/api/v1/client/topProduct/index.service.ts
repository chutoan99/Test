import connectDatabase from '~/configs/database'
import { TopProductResponse } from './index.response'
import { TopProduct } from './index.type'

const TopProductService = {
  GetAll: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT id, data_type, count, name, images, sort_type, best_price, display_text, createdAt, updatedAt FROM TopProducts`
    try {
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: TopProductResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as TopProduct[]
      }

      const errorResponse: TopProductResponse = {
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

export default TopProductService
