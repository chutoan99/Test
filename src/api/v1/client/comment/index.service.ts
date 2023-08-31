const db = require('../../models/index')
import { formatCommentsResponse } from '~/utils/formatComment'
import { generateCmtid } from '~/utils/gennerateNumber'
require('dotenv').config()
const cloudinary = require('cloudinary').v2
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
      queries.limit = +fLimit

      const response = await db.Comment.findAndCountAll({
        where: { ...query },
        ...queries,
        attributes: {
          exclude: ['id']
        }
      })

      const responseRepPromises = response.rows.map((item: any) =>
        db.Comment.findOne({
          where: { parent_cmtid: item.cmtid },
          attributes: {
            exclude: [
              'id',
              'like_count',
              'liked',
              'videos',
              'model_name',
              'options',
              'is_replied',
              'rating',
              'rating_star',
              'author_username',
              'author_portrait',
              'images',
              'cover',
              'status'
            ]
          }
        })
      )

      const responseReps = await Promise.all(responseRepPromises)

      const listComment = response.rows.map((item: any, index: number) => ({
        ...item,
        comment_rep: responseReps[index]
      }))

      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'cant not found..',
        page: page ? +page : 0,
        limit: limit ? +limit : +process.env.LIMIT!,
        totalPage: response.count ? Math.ceil(response.count / fLimit) : 0,
        totalItem: response.count || 0,
        response: response.count ? formatCommentsResponse(listComment) : []
      }
    } catch (error) {
      throw new Error(`Failed to gets comments: ${error}`)
    }
  },

  Create: async (userid: any, payload: any, filesdata: any) => {
    try {
      const imageUrls: any = []
      const uniqueFiles = new Set(filesdata) // Convert to a set to remove duplicates

      await Promise.all(
        Array.from(uniqueFiles).map(async (file: any) => {
          console.log(file, 'file')
          const result = await cloudinary.uploader.upload(file.path)
          imageUrls.push(result.secure_url)
        })
      )
      const user = await db.User.findOne({
        where: { userid: userid }
      })
      if (!user) {
        throw new Error('User not found.')
      }
      const response = await db.Comment.create({
        cmtid: generateCmtid(),
        orderid: payload?.orderid,
        itemid: payload?.itemid,
        userid: user?.userid,
        shopid: payload?.shopid,
        comment: payload?.comment,
        rating_star: payload?.rating_star,
        author_username: user?.name,
        author_portrait: user?.avatar,
        images: JSON.stringify(imageUrls),
        model_name: payload?.model_name,
        options: payload?.option,
        level: 0,
        is_shop: false,
        like_count: 0,
        liked: false
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to create comments:',
        response: response ? response : null
      }
    } catch (error) {
      console.log(error, 'error')
      throw new Error(`Failed to create comments: `)
    }
  }
}
export default CommentService
