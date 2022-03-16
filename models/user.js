import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcryptM from 'mongoose-bcrypt'

export const postSchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
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
  }
})

userSchema.plugin(bcryptM)
userSchema.plugin(uniqueValidator, { message: '{VALUE} already exists' })

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel
