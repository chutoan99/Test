const db = require('../../models/index')

const RoomService = {
  GetAll: async (shopid: any) => {
    try {
      const ListRoom = await db.Room.findAll({
        where: { shopid: shopid },
        attributes: {
          exclude: ['id']
        }
      })
      const ListRoomResponse: any[] = []
      await Promise.all(
        ListRoom.map(async (item: any) => {
          const user = await db.User.findOne({
            where: { userid: item.userid },
            attributes: {
              exclude: [
                'id',
                'createdAt',
                'updatedAt',
                'password',
                'refreshToken',
                'passwordResetToken',
                'passwordResetExpires',
                'passwordChangedAt'
              ]
            }
          })
          const newItem = {
            ...item.dataValues,
            user_info: user
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
  }
}

export default RoomService
