const db = require('../../models/index')

const ShopService = {
  GetAll: async ({ page, limit }: { page?: number; limit?: number }) => {
    try {
      const queries: any = { raw: true, nest: true }
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = +limit! || +process.env.LIMIT!
      queries.offset = offset * fLimit
      queries.limit = fLimit
      const response = await db.Shop.findAndCountAll({
        ...queries,
        order: [['createdAt', 'DESC']], // Sắp xếp theo createdAt giảm dần
        attributes: {
          exclude: ['id']
        }
      })
      const total = Math.ceil(response.count / fLimit)
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'cannot be found',
        page: page ? +page : 0,
        limit: +limit! ? +limit! : +process.env.LIMIT!,
        totalPage: total,
        response
      }
    } catch (error) {
      throw new Error('Shop is not found.')
    }
  }
}

export default ShopService
