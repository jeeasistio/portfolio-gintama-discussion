import Comment from '../models/comment'
import Post from '../models/post'
import Episode from '../models/episode'
import User from '../models/user'

export const getPostComments = async (postId) => {
  const comments = await Comment.find({ post: postId })
    .populate('post', Post)
    .populate('user', User)
    .sort({ date_commented: -1 })
  return comments
}

export const getEpisodeComments = async (episodeId) => {
  const comments = await Comment.find({ episode: episodeId })
    .populate('episode', Episode)
    .populate('user', User)
    .sort({ date_commented: -1 })
  return comments
}
