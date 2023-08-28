const db = require('../../models/index')
const cloudinary = require('cloudinary').v2
import { generateItemid } from '~/utils/gennerateNumber'

const ProductService = {
  GetAll: async ({ page, limit, shopid }: { page?: number; limit?: number; shopid: any }) => {
    try {
      const queries: any = { raw: true, nest: true }
      const offset = !page || +page <= 1 ? 0 : +page - 1
      const fLimit = +limit! || +process.env.LIMIT!
      queries.offset = offset * fLimit
      queries.limit = fLimit

      const response = await db.Post.findAndCountAll({
        where: { shopid: shopid },
        ...queries,
        order: [['createdAt', 'DESC']], // Sắp xếp theo createdAt giảm dần
        attributes: [
          'itemid',
          'shopid',
          'catid',
          'name',
          'image',
          'historical_sold',
          'price',
          'price_min',
          'stock',
          'price_max',
          'price_before_discount',
          'price_min_before_discount',
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

  Create: async (shopid: any, payload: any, fileData: any) => {
    try {
      const itemid = generateItemid()
      const response = await db.Post.create({
        itemid,
        shopid: shopid,
        name: payload?.name,
        image: fileData?.path,
        stock: +payload?.stock,
        filename: fileData?.filename,
        historical_sold: +payload?.historical_sold,
        price: +payload?.price,
        price_min: +payload?.price_min,
        price_max: +payload?.price_max,
        price_min_before_discount: +payload?.price_min_before_discount,
        price_max_before_discount: +payload?.price_max_before_discount,
        discount: payload?.discount === '' ? null : payload.discount,
        shop_rating: 5,
        catid: +payload?.catid,
        shop_name: payload?.shop_name
        // liked: payload?.liked,
        // ctime: payload?.ctime,
        // show_free_shipping: payload?.show_free_shipping,
        // is_official_shop: payload?.is_official_shop,
        // is_service_by_shopee: payload?.is_service_by_shopee,
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add Product.',
        response
      }
      if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename)
      throw new Error(`Failed to add Product.`)
    }
  },

  GetOne: async (itemid: any) => {
    try {
      const tier_variations = await db.TierVariation.findAll({
        where: {
          itemid: itemid
        },
        attributes: { exclude: ['id', 'itemid', 'createdAt', 'updatedAt'] }
      })
      const response = await db.Post.findOne({
        where: {
          itemid: itemid
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Category,
            as: 'categories',
            attributes: {
              exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.Video,
            as: 'video',
            attributes: {
              exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
            }
          },

          {
            model: db.Attribute,
            as: 'attributes',
            attributes: {
              exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.Shop,
            as: 'shop_info',
            attributes: {
              exclude: ['id', 'shopid', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.DeepDiscountSkin,
            as: 'deep_discount_skin',
            attributes: {
              exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
            }
          },
          {
            model: db.VoucherProduct,
            as: 'voucher',
            attributes: {
              exclude: ['id', 'itemid', 'createdAt', 'updatedAt']
            }
          }
        ]
      })
      if (response.deep_discount_skin.promotion_price === null) {
        delete response['deep_discount_skin']
      }
      if (response.video.video_id === null) {
        delete response['video']
      }
      if (response.voucher.promotion_id === null) {
        delete response['voucher']
      }
      if (response.attributes.name === null) {
        delete response['attributes']
      }
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get PostId.',
        response: { ...response, tier_variations: tier_variations }
      }
    } catch (error) {
      throw new Error(`Failed to get PostId.`)
    }
  },

  Update: async (itemid: any, fileData: any, payload: any) => {
    try {
      if (fileData) {
        payload.image = fileData.path
      }
      const response = await db.Post.update(
        {
          name: payload?.name,
          image: payload?.image,
          historical_sold: payload?.historical_sold,
          price: payload?.price,
          price_min: payload?.price_min,
          stock: payload?.stock,
          price_max: payload?.price_max,
          price_min_before_discount: payload?.price_min_before_discount,
          price_max_before_discount: payload?.price_max_before_discount,
          discount: payload?.discount,
          shop_rating: payload?.shop_rating
        },
        {
          where: { itemid: itemid }
        }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'update Product success' : 'Failed to Product.',
        response
      }
      if (fileData && !response) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename)
      throw new Error(`Failed to Product.`)
    }
  },

  Delete: async (itemid: any, fileName: any) => {
    try {
      const response = await db.Post.destroy({
        where: { itemid }
      })
      cloudinary.api.delete_resources(fileName)

      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : `Failed to Delete Overview ${itemid}.`,
        response
      }
    } catch (error) {
      throw new Error(`Failed to Delete Overview ${itemid}.`)
    }
  }
}
export default ProductService
