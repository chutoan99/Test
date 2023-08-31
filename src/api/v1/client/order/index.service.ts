const db = require('../../models/index')
import { generateOrderid } from '~/utils/gennerateNumber'

const OrderService = {
  GetAll: async (userid: any) => {
    try {
      const listCart = await db.Order.findAll({
        where: { userid: userid },
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      })

      const orderCounts: { [key: number]: number } = {
        1: 0, // Chờ thanh toán
        2: 0, // Vận chuyển
        3: 0, // Đang giao
        4: 0, // Hoàn thành
        5: 0, // Đã hủy
        6: 0 // Trả hàng
      }
      const ListResponse: any[] = []
      const ListPostPromises = listCart.map((item: any) => {
        const itemGroups = JSON.parse(item.item_groups_id)
        orderCounts[item.type]++

        return Promise.all(
          itemGroups.map((itemid: any) => {
            return db.Post.findOne({
              where: { itemid: itemid },
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
          })
        ).then((ListPost) => {
          const newItem = {
            ...item.dataValues,
            option: JSON.parse(item.option),
            amount: JSON.parse(item.amount),
            item_groups_id: JSON.parse(item.item_groups_id),
            posts: ListPost
          }
          ListResponse.push(newItem)
        })
      })

      await Promise.all(ListPostPromises)

      return {
        err: ListResponse.length ? 0 : 1,
        msg: ListResponse.length ? 'OK' : 'Failed to get all Orders of the user.',
        response: ListResponse,
        tabs: {
          is_all: listCart.length,
          is_wait_for_pay: orderCounts[1],
          is_transport: orderCounts[2],
          is_delivering: orderCounts[3],
          is_cancelled: orderCounts[4],
          is_success: orderCounts[4], // Assuming this was intended to show the count of completed orders
          is_returns: orderCounts[5]
        }
      }
    } catch (error) {
      throw new Error('Failed to get all Orders of the user.')
    }
  },

  Search: async (userid: any, payload: any) => {
    try {
      const listCart = await db.Order.findAll({
        where: { userid: userid },
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      })
      const orderCounts: { [key: number]: number } = {
        1: 0, // Chờ thanh toán
        2: 0, // Vận chuyển
        3: 0, // Đang giao
        4: 0, // Hoàn thành
        5: 0, // Đã hủy
        6: 0 // Trả hàng
      }
      listCart.map((item: any) => {
        orderCounts[item.type]++
      })
      const query: any = {}
      if (payload.type) query.type = payload.type
      // if (payload.shop_name) query.shop_name = { [Op.substring]: payload.shop_name }
      query.userid = userid

      const Cart = await db.Order.findAll({
        where: query,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      })

      const ListResponse: any[] = []
      const ListPostPromises = Cart.map((item: any) => {
        const itemGroups = JSON.parse(item.item_groups_id)
        return Promise.all(
          itemGroups.map((itemid: any) => {
            return db.Post.findOne({
              where: { itemid: itemid },
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
          })
        ).then((ListPost) => {
          const newItem = {
            ...item.dataValues,
            option: JSON.parse(item.option),
            amount: JSON.parse(item.amount),
            item_groups_id: JSON.parse(item.item_groups_id),
            posts: ListPost
          }
          ListResponse.push(newItem)
        })
      })

      await Promise.all(ListPostPromises)

      return {
        err: ListResponse.length ? 0 : 1,
        msg: ListResponse.length ? 'OK' : 'Failed to get all Orders of the user.',
        response: ListResponse,
        tabs: {
          is_all: listCart.length,
          is_wait_for_pay: orderCounts[1],
          is_transport: orderCounts[2],
          is_delivering: orderCounts[3],
          is_cancelled: orderCounts[4],
          is_success: orderCounts[4], // Assuming this was intended to show the count of completed orders
          is_returns: orderCounts[5]
        }
      }
    } catch (error) {
      throw new Error('Failed to get all Orders of the user.')
    }
  },

  GetOne: async (userid: any, orderid: any) => {
    try {
      const userResponse = await db.User.findOne({
        where: { userid: userid },
        attributes: {
          exclude: [
            'id',
            'createdAt',
            'updatedAt',
            'refreshToken',
            'passwordResetToken',
            'passwordResetExpires',
            'passwordChangedAt',
            'password'
          ]
        }
      })

      const response = await db.Order.findOne({
        where: { userid: userid, orderid: orderid },
        attributes: {
          exclude: ['id', 'updatedAt']
        }
      })

      const postPromises = JSON.parse(response.item_groups_id).map(async (itemid: any) => {
        const data = await db.Post.findOne({
          where: { itemid: itemid },
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
        return data
      })
      const allPosts = await Promise.all(postPromises)
      const newOrder = {
        ...response.dataValues,
        option: JSON.parse(response.option),
        amount: JSON.parse(response.amount),
        user: userResponse,
        item_groups_id: JSON.parse(response.item_groups_id),
        posts: allPosts
      }
      return {
        err: newOrder ? 0 : 1,
        msg: newOrder ? 'OK' : 'Failed to get all Orders of the user.',
        response: newOrder
      }
    } catch (error) {
      console.log(error, 'error')
      throw new Error('Failed to get all Orders of the user.')
    }
  },

  Create: async (payload: any, userid: any) => {
    try {
      const length = payload.length
      const listResponse = []
      for (let index = 0; index < length; index++) {
        const response = await db.Order.create({
          orderid: +generateOrderid(),
          userid: userid,
          itemid: payload[index].itemid,
          shopid: payload[index].shopid,
          shop_name: payload[index].shop_name,
          amount: payload[index].amount,
          option: payload[index].option,
          note: payload[index].note,
          shiped: false,
          state: 'Chờ xác nhận',
          type: 1,
          item_groups_id: payload[index].item_groups_id,
          final_total: payload[index].final_total,
          total_num_items: payload[index].total_num_items
        })
        listResponse.push(response)
      }
      return {
        err: listResponse ? 0 : 1,
        msg: listResponse ? 'OK' : 'Failed to add order.',
        response: listResponse ? listResponse : null
      }
    } catch (error) {
      throw new Error('Failed to add order.')
    }
  },

  Update: async (orderid: any, payload: any, userid: any) => {
    try {
      const response = await db.Order.update(
        {
          amount: payload?.amount,
          option: payload?.option,
          state: payload?.state,
          type: payload.type
        },
        { where: { orderid: orderid, userid: userid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to Update order.',
        response
      }
    } catch (error) {
      throw new Error('Failed to Update order.')
    }
  },

  Delete: async (orderid: any, userid: any) => {
    try {
      const response = db.Order.destroy({
        where: { orderid: orderid, userid: userid }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete order.'
      }
    } catch (error) {
      throw new Error('Failed to delete order.')
    }
  }
}

export default OrderService
