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

const movieSchema = new Schema({
  movie: {
    type: String,
    required: [true, 'Please enter a movie']
  },
  comments: [commentSchema]
})


module.exports = mongoose.models.MovieComment || mongoose.model('MovieComment', movieSchema);