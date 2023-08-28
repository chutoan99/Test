const db = require('../../models/index')
import { formatDataResponse } from '~/utils/formatdata'

const PostService = {
  GetAll: async ({ page, limit }: { page?: number; limit?: number }) => {
    try {
      const queries: any = { raw: true, nest: true }
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = +limit! || +process.env.LIMIT!
      queries.offset = offset * fLimit
      queries.limit = fLimit

      const response = await db.Post.findAndCountAll({
        ...queries,
        order: [['createdAt', 'DESC']], // Sắp xếp theo createdAt giảm dần
        attributes: [
          'itemid',
          'shopid',
          'catid',
          'name',
          'image',
          'historical_sold',
          'stock',
          'price_before_discount',
          'price_min_before_discount',
          'price_min',
          'price',
          'price_max',
          'price_max_before_discount',
          'discount',
          'shop_rating',
          'filename',
          'shop_name',
          'liked',
          'ctime',
          'show_free_shipping',
          'is_official_shop',
          'is_service_by_shopee'
        ]
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
      throw new Error('Failed to get Post')
    }
  },

  Search: async ({
    page,
    limit,
    order,
    name,
    price,
    ...query
  }: {
    page?: number
    limit?: number
    order?: string
    name?: string
    price?: number[]
    [key: string]: any
  }) => {
    try {
      const queries: any = { raw: true, nest: true }
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = +limit! || +process.env.LIMIT!
      queries.offset = offset * fLimit
      queries.limit = fLimit
      if (order) queries.order = [order]
      // if (name) query.name = { [Op.substring]: name }
      // if (price) query.price = { [Op.between]: price }

      const response = await db.Post.findAndCountAll({
        where: query,
        ...queries
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
      throw new Error('Failed to get Post')
    }
  },

  GetOne: async (itemid: any) => {
    try {
      const response = await db.Post.findOne({
        where: {
          itemid: itemid
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.TierVariation,
            as: 'tier_variations',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.Industry,
            as: 'categories',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.Video,
            as: 'video',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.Attribute,
            as: 'attributes',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.Shop,
            as: 'shop_info',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.DeepDiscountSkin,
            as: 'deep_discount_skin',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.VoucherProduct,
            as: 'voucher',
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          }
        ]
      })
      return {
        err: formatDataResponse(response) ? 0 : 1,
        msg: formatDataResponse(response) ? 'OK' : 'Failed to get PostId.',
        response: formatDataResponse(response)
      }
    } catch (error) {
      throw new Error('Failed to get PostId.')
    }
  }
}
export default PostService
