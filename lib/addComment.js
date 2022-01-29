import { Types } from 'mongoose'
import Comment from '../models/comment'

export const addPostComment = async (userId, postId, content) => {
  const newComment = new Comment({
    user: Types.ObjectId(userId),
    content,
    post: Types.ObjectId(postId),
  })

  return newComment
}

export const addEpisodeComment = async (userId, episodeId, content) => {
  const newComment = new Comment({
    user: Types.ObjectId(userId),
    content,
    post: Types.ObjectId(episodeId),
  })

  return newComment
}