import handler from '../../../../lib/handler'
import User from '../../../../models/user'
import Comment from '../../../../models/comment'
import { addEpisodeComment } from '../../../../lib/addComment'

export default handler.post(async (req, res) => {
  const { content } = req.body
  const userId = req.user
  const episodeId = req.query.id

  const newComment = await addEpisodeComment(userId, episodeId, content)

  newComment.save(async (err, comment) => {
    if (err) return res.status(400).json(err)
    const populatedComment = await Comment.findById(comment.id).populate('user', User)

    res.status(200).json(populatedComment)
  })
})
