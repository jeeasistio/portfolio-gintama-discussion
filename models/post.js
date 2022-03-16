import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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

const postModel = mongoose.models.Post || mongoose.model('Post', postSchema)

export default postModel
