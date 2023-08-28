import connectDatabase from '~/configs/database'
import { BannerResponse } from './index.response'
import { Banner } from './index.type'

const BannerService = {
  GetBanners: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT id, image_url, createdAt, updatedAt FROM Banners`
    try {
      const [response, _] = await db.query(sqlQuery)
      let total = 0
      if (Array.isArray(response)) {
        total = response.length
      }

      const successResponse: BannerResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: response as Banner[]
      }

      const errorResponse: BannerResponse = {
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

export default BannerService
