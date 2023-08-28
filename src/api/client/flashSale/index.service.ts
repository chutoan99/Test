import connectDatabase from '~/configs/database'
import { FlashSale } from './index.type'
import { FlashSaleResponse } from './index.response'

const FlashSaleService = {
  GetAll: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT itemid, shopid, catid, name, image, price,  price_min, price_max, stock, historical_sold, price_min_before_discount, price_max_before_discount, discount, shop_rating, filename, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time, createdAt, updatedAt FROM FlashSales`
    try {
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: FlashSaleResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as FlashSale[]
      }

      const errorResponse: FlashSaleResponse = {
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

export default FlashSaleService
