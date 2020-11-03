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

const ovaSchema = new Schema({
  ova: {
    type: String,
    required: [true, 'Please enter an ova']
  },
  comments: [commentSchema]
})


module.exports = mongoose.models.OvaComment || mongoose.model('OvaComment', ovaSchema);