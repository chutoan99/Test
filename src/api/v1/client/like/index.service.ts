import connectDatabase from '~/configs/database'
import { CreateLikeResponse, LikeResponse } from './index.response'
import { CreateLike, Like } from './index.type'
import { generatelikeid } from '~/utils/gennerateNumber'

const LikeService = {
  GetAll: async (userid: string) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT id, userid, itemid, shopid, createdAt, updatedAt FROM Likes WHERE userid = ? `
    try {
      const [response, _] = await db.query(sqlQuery, [userid])
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }
      const successResponse: LikeResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as Like[]
      }

      const errorResponse: LikeResponse = {
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

  Create: async (payload: CreateLike, userid: number) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `INSERT INTO Likes (id, userid, itemid, shopid, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`
    try {
      const [response, _] = await db.query(sqlQuery, [generatelikeid(), userid, payload.itemid, payload.shopid, new Date(), new Date()])
      const successResponse: CreateLikeResponse = {
        err: 0,
        msg: 'OK'
      }

      const errorResponse: CreateLikeResponse = {
        err: 1,
        msg: 'Error'
      }

      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  },

  Delete: async (itemid: string, userid: string) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT itemid, shopid, catid, name, image, price,  price_min, price_max, stock, historical_sold, price_min_before_discount, price_max_before_discount, discount, shop_rating, filename, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time, createdAt, updatedAt FROM FlashSales`
    try {
      // const response = await db.Like.destroy({
      //   where: { itemid: itemid, userid: userid }
      // })
      // return {
      //   err: response ? 0 : 1,
      //   msg: response ? 'OK' : 'Failed to delete like.'
      // }
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  }
}

export { LikeService }
