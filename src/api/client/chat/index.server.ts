import ChatModel from '~/models/chat'
import { generateChatid } from '~/utils/gennerateNumber'

const ChatService = {
  GetUser: async (userid: any) => {
    try {
      // const response = await db.User.findOne({
      //   where: { userid: userid },
      //   attributes: {
      //     exclude: ['id', 'updatedAt', 'password']
      //   }
      // })
      // return {
      //   err: response ? 0 : 1,
      //   msg: response ? 'OK' : 'User is not found.',
      //   response
      // }
    } catch (error) {
      throw new Error('Failed to get all batchList.')
    }
  },

  SaveAndGetMessage: async (payload: any) => {
    const newChat = new ChatModel({
      id: generateChatid(),
      room_id: payload.roomid,
      content: {
        mess: payload.message
      },
      from_id: +payload.user.userid,
      from_user_name: payload.user.name,
      to_id: +payload.shop.userid,
      to_user_name: payload.shop.username
    })
    await newChat.save()
    const chats = ChatModel.find({ room_id: payload.roomid })
    return chats
  },

  GetMessage: async (roomid: number) => {
    const chats = ChatModel.find({ room_id: roomid })
    return chats
  }
}

export default ChatService
