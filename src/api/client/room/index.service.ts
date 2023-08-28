import connectDatabase from '~/configs/database'
import { generateRoomid } from '~/utils/gennerateNumber'
import { CreateRoomResponse, RoomResponse } from './index.response'
import { CreateRoom, Room } from './index.type'

const RoomService = {
  GetAll: async (userid: any) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `
    SELECT roomid, shopid, createdAt, updatedAt 
    FROM Rooms WHERE userid = ?`
    const sqlQueryShop = `
    SELECT 
      shopid, userid, is_official_shop, item_count, rating_star, name, cover, follower_count,
      rating_bad, rating_good, rating_normal, status, shop_location, username, portrait, ctime, mtime,
      response_rate, country, response_time, description, followed, last_active_time, createdAt, updatedAt
    FROM Shops 
    WHERE shopid = ?`
    try {
      const [ListRoom, _]: [any, any] = await db.query(sqlQuery, [userid])
      const ListRoomResponse: any[] = []
      await Promise.all(
        ListRoom.map(async (item: any) => {
          const [shop, _]: [any, any] = await db.query(sqlQueryShop, [item?.shopid])
          const formatShop = shop.length ? shop[0] : null
          const newItem = {
            ...item,
            shop_info: formatShop
          }
          ListRoomResponse.push(newItem)
        })
      )

      let total = 0
      if (Array.isArray(ListRoomResponse)) {
        total = ListRoomResponse.length
      }

      const successResponse: RoomResponse = {
        err: 0,
        msg: 'OK',
        total: total,
        response: ListRoomResponse as Room[]
      }

      const errorResponse: RoomResponse = {
        err: 1,
        msg: 'Error',
        response: null
      }

      return ListRoomResponse ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  },

  Create: async (payload: CreateRoom, userid: any) => {
    const pool = connectDatabase.mysql()
    const db = await pool.getConnection()
    const sqlQuery = `INSERT INTO Rooms (roomid, shopid, userid, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`
    try {
      const [response, _] = await db.query(sqlQuery, [generateRoomid(+userid, payload.shopid), payload.shopid, userid, new Date(), new Date()])

      const successResponse: CreateRoomResponse = {
        err: 0,
        msg: 'OK'
      }
      const errorResponse: CreateRoomResponse = {
        err: 1,
        msg: 'Error'
      }

      return response ? successResponse : errorResponse
    } catch (err: any) {
      console.error('Error executing query:', err.message)
    } finally {
      db.release()
    }
  }
}

export default RoomService
