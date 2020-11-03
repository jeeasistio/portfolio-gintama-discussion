const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const bcryptM = require('mongoose-bcrypt');

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

const postSchema = new Schema({
  user: {
    type: String,
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
  }, 
  comments: [commentSchema]
})

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    minlength: [8, 'Username too short'],
    maxLength: [15, 'Username too long']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password too short'],
    maxLength: [20, 'Password too long']
  },
  posts: [postSchema]
})

userSchema.plugin(bcryptM);
userSchema.plugin(uniqueValidator, { message: '{VALUE} already exists'} );

module.exports = mongoose.models.User || mongoose.model('User', userSchema);