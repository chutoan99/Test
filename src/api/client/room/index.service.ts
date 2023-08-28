import { generateRoomid } from '~/utils/gennerateNumber'
const db = require('../../models/index')

const RoomService = {
  GetAll: async (userid: any) => {
    try {
      const ListRoom = await db.Room.findAll({
        where: { userid: userid },
        attributes: {
          exclude: ['id', 'userid']
        }
      })
      const ListRoomResponse: any[] = []
      await Promise.all(
        ListRoom.map(async (item: any) => {
          const shop = await db.Shop.findOne({
            where: { shopid: item.shopid },
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt']
            }
          })
          const newItem = {
            ...item.dataValues,
            shop_info: shop
          }
          ListRoomResponse.push(newItem)
        })
      )
      return {
        err: ListRoomResponse.length > 0 ? 0 : 1,
        msg: ListRoomResponse.length > 0 ? 'OK' : 'Failed to get all rooms.',
        total: ListRoomResponse.length > 0 ? ListRoomResponse.length : 0,
        response: ListRoomResponse
      }
    } catch (error) {
      throw new Error('Failed to get all rooms.')
    }
  },

  GetOne: async (roomid: any) => {
    try {
      const roomResponse = await db.Room.findOne({
        where: { roomid: roomid },
        attributes: {
          exclude: ['id', 'userid']
        }
      })
      const shop = await db.Shop.findOne({
        where: { shopid: roomResponse.shopid },
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      })
      const response = {
        ...roomResponse.dataValues,
        shop_info: shop
      }
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get  rooms.',
        response: response
      }
    } catch (error) {
      throw new Error('Failed to get  room.')
    }
  },

  Create: async (payload: any, userid: any) => {
    try {
      const response = await db.Room.create({
        roomid: generateRoomid(+userid, payload.shopid),
        userid: userid,
        shopid: payload.shopid
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to add room.',
        response: response
      }
    } catch (error) {
      throw new Error('Failed to add room.')
    }
  },

  Delete: async (roomid: any, userid: any) => {
    try {
      const response = await db.Room.destroy({ where: { roomid: roomid, userid: userid } })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to delete room.',
        response
      }
    } catch (error) {
      throw new Error('Failed to delete roomm.')
    }
  }
}

export default RoomService
