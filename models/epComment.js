const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: String,
    required: [true, 'Please enter a user']
  },
  content: {
    type: String,
    required: [true, 'Please enter some content']
  }
})

const epCommentSchema = new Schema({
  episode: {
    type: String,
    required: [true, 'Please enter an episode']
  },
  comments: [commentSchema]
})


module.exports = mongoose.models.EpComment || mongoose.model('EpComment', epCommentSchema);