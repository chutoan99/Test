import connectDatabase from '~/configs/database'
import { ShopMall } from './index.type'
import { ShopMallResponse } from './index.response'

const ShopMallService = {
  GetAll: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT url, image, shopid, promo_text, createdAt, updatedAt FROM ShopMalls`
    try {
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: ShopMallResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as ShopMall[]
      }

      const errorResponse: ShopMallResponse = {
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

export default ShopMallService
