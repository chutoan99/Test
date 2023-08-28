import dotenv from 'dotenv'
import connectDatabase from '~/configs/database'
dotenv.config()

const GetAllIndustryService = {
  GetAllIndustry: async () => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT itemid, shopid, catid, name, image, price,  price_min, price_max, stock, historical_sold, price_min_before_discount, price_max_before_discount, discount, shop_rating, filename, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time, createdAt, updatedAt FROM FlashSales`
    try {
      // const response = await db.Industry.findAll({
      //   attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'images'] }
      // })
      // return {
      //   err: response ? 0 : 1,
      //   msg: response ? 'OK' : 'Failed to get all Industry.',
      //   total: response.length,
      //   response
      // }
    } catch (error) {
      console.log(error)
    }
  },

  GetAllIndustryWithCategory: async ({ page, limit, category_name }: { page: number; limit: number; category_name: any }) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `SELECT itemid, shopid, catid, name, image, price,  price_min, price_max, stock, historical_sold, price_min_before_discount, price_max_before_discount, discount, shop_rating, filename, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time, createdAt, updatedAt FROM FlashSales`
    try {
      // const response = await db.Industry.findAll({
      //   where: { category_name: category_name }
      // })
      // const catid = response[0].catid
      // const queries: any = {}
      // const offset = page && page > 0 ? (page - 1) * limit : 0
      // const fLimit = limit || process.env.LIMIT || 10
      // queries.catid = catid
      // const response2 = await db.Post.findAndCountAll({
      //   where: { catid: queries.catid },
      //   offset: offset, // Add the offset and limit here
      //   limit: fLimit
      // })
      // const total = Math.ceil(response2.count / +fLimit)
      // return {
      //   err: response ? 0 : 1,
      //   msg: response ? 'OK' : 'Failed to get all Industry.',
      //   page: page ? +page : 0,
      //   limit: limit ? +limit : process.env.LIMIT || 10,
      //   totalPage: total,
      //   response: response2
      // }
    } catch (error) {
      console.log(error)
    }
  }
}
export default GetAllIndustryService
