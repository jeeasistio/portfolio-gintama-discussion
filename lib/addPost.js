import { Types } from 'mongoose'
import Post from '../models/post'

export const addPost = async (userId, subject, content) => {
  const newPost = new Post({
    user: Types.ObjectId(userId),
    subject,
    content
  })

  return newPost
}