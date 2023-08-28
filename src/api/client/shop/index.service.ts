import connectDatabase from '~/configs/database'
import { PostOfShopResponse, ShopInforResponse } from './index.response'
import { Post, ShopInfor } from './index.type'

const ShopService = {
  GetItems: async (shopid: any) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `
    SELECT 
      itemid, shopid, catid, name, image, historical_sold, price, 
      price_min, stock, price_max, price_before_discount, 
      price_min_before_discount, price_max_before_discount, discount, 
      shop_rating, filename, shop_name, liked, ctime, 
      show_free_shipping, is_official_shop, is_service_by_shopee 
    FROM Posts 
    WHERE shopid = ?`
    try {
      const [response, _] = await db.query(sqlQuery, [shopid])
      let total = 0

      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: PostOfShopResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as Post[]
      }

      const errorResponse: PostOfShopResponse = {
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

  GetShopID: async (shopid: any) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `
      SELECT 
        id, shopid, userid, is_official_shop, item_count, rating_star, name, cover, follower_count,
        rating_bad, rating_good, rating_normal, status, shop_location, username, portrait, ctime, mtime,
        response_rate, country, response_time, description, followed, last_active_time, createdAt, updatedAt
      FROM Shops 
      WHERE shopid = ?`

    try {
      const [result, _]: [any, any] = await db.query(sqlQuery, [shopid])
      const response = result.length ? result[0] : null

      const successResponse: ShopInforResponse = {
        err: 0,
        msg: 'OK',
        response: response as ShopInfor
      }

      const errorResponse: ShopInforResponse = {
        err: 1,
        msg: 'Error',
        response: null
      }

      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
      const errorResponse: ShopInforResponse = {
        err: 1,
        msg: 'Error',
        response: null
      }
      return errorResponse
    } finally {
      db.release()
    }
  }
}

export default ShopService
