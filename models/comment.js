import { Schema, models, model } from 'mongoose'

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please enter a user']
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  episode: {
    type: Schema.Types.ObjectId,
    ref: 'Episode',
  },
  content: {
    type: String,
    required: [true, 'Please add some content']
  },
  date_commented: {
    type: Date,
    default: Date.now()
  },
})

export default models.Comment || model('Comment', commentSchema)
