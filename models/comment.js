import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please enter a user']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  episode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode'
  },
  content: {
    type: String,
    required: [true, 'Please add some content']
  },
  date_commented: {
    type: Date,
    default: Date.now()
  }
})

const commentModel =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default commentModel
