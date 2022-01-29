import Post from '../models/post'
import User from '../models/user'

export const getGlobalPosts = async () => {
  const posts = await Post.find().populate('user', User)
  return posts
}

export const getPost = async (postId) => {
  const post = await Post.findById(postId).populate('user', User)
  return post
}

export const getUserPosts = async (userId) => {
  const posts = await Post.find({ user: userId })
    .populate('user', User)
    .sort({ date_posted: -1 })
  return posts
}

export const getUserAndPosts = async (userId) => {
  const user = await getUser()
  const posts = await getUserPosts(userId)
  return { user, posts }
}
