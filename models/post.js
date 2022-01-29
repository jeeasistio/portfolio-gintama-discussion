import { Schema, models, model } from 'mongoose'

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please enter a user']
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  content: {
    type: String,
    required: [true, 'Please add some content']
  },
  date_posted: {
    type: Date,
    default: Date.now()
  }
})

export default models.Post || model('Post', postSchema)
