const db = require('../../models/index')

interface GetAllCommentOptions {
  page?: number
  limit?: number
  order?: string
  name?: string
  price?: [number, number]
  itemid?: number
  shopid?: number
  orderid?: number
}

const CommentService = {
  GetAll: async ({ page, limit, order, name, price, itemid, shopid, orderid }: GetAllCommentOptions) => {
    try {
      const queries: any = { raw: true, nest: true }
      const query: any = {}
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = limit || +process.env.LIMIT!
      if (order) queries.order = [order]
      if (shopid) query.shopid = shopid
      if (itemid) query.itemid = itemid
      if (orderid) query.orderid = orderid
      // if (name) query.name = { [Op.substring]: name }
      // if (price) query.price = { [Op.between]: price }
      queries.offset = offset * fLimit
      queries.limit = fLimit
      const total = await db.Comment.findAll({
        where: { ...query }
      })
      const response = await db.Comment.findAll({
        where: { ...query },
        ...queries
      })
      const lengthResponse = response.length
      for (let i = 0; i < lengthResponse; i++) {
        response[i].images = JSON.parse(response[i].images)
      }
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'cant not found..',
        page: page ? +page : 0,
        limit: limit ? limit : +process.env.LIMIT!,
        totalPage: Math.ceil(total.length / (limit !== undefined ? +limit : +process.env.LIMIT!)),
        response
      }
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  },

  GetOne: async () => {
    try {
      return {}
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  },

  Create: async () => {
    try {
      return {}
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  },

  Update: async () => {
    try {
      return {}
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  },

  Delete: async () => {
    try {
      return {}
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  }
}
export default CommentService
