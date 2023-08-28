import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatSchema = new Schema(
  {
    id: { type: String },
    room_id: { type: Number },
    content: {
      mess: { type: String },
      type: { type: String, default: 'mess' }
    },
    from_id: { type: Number },
    from_user_name: { type: String },
    to_id: { type: Number },
    to_user_name: { type: String }
  },
  { timestamps: true }
)

const ChatModel = mongoose.model('chat', chatSchema)
export default ChatModel
