import handler from '../../../../lib/handler'
import User from '../../../../models/user'
import { addEpisodeComment } from '../../../../lib/addComment'

export default handler.post(async (req, res) => {
  const { content, postId } = req.body
  const userId = req.user

  const newComment = await addEpisodeComment(userId, postId, content)

  newComment.save((err, comment) => {
    if (err) return res.status(400).json(err)

    res.status(200).json(comment)
  })
})
