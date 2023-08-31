const db = require('../../models/index')

const AccountService = {
  GetProfile: async (userid: any) => {
    try {
      const response = await db.User.findOne({
        where: {
          userid: userid
        },
        attributes: {
          exclude: ['password', 'avatar']
        }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'User is not found.',
        response
      }
    } catch (error) {
      throw new Error('User is not found.')
    }
  },

  UpdateProfile: async (userid: any, payload: any) => {
    try {
      const response = await db.User.update(
        {
          name: payload?.name,
          email: payload?.email,
          sex: payload?.sex,
          address: payload?.address,
          phone: payload?.phone,
          birthday: payload?.birthday
        },
        { where: { userid: userid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to Update User.',
        response
      }
    } catch (error) {
      throw new Error('Failed to Update User.')
    }
  },

  GetShop: async (userid: any) => {
    try {
      const response = await db.Shop.findOne({
        where: {
          userid: userid
        },
        attributes: {
          exclude: ['password']
        }
      })
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Shop is not found.',
        response
      }
    } catch (error) {
      throw new Error('Shop is not found.')
    }
  },

  UpdateShop: async (userid: any, payload: any) => {
    try {
      const response = await db.Shop.update(
        {
          is_official_shop: payload?.is_official_shop,
          name: payload?.name,
          cover: payload?.cover,
          status: payload?.status,
          shop_location: payload?.shop_location,
          username: payload?.username,
          portrait: payload?.portrait,
          description: payload?.description,
          country: payload?.country
        },
        { where: { userid: userid } }
      )
      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to update shop.',
        response
      }
    } catch (error) {
      throw new Error('Failed to update shop.')
    }
  }
}

export default AccountService
