import handler from '../../../../lib/handler'
import { getDetailedComments } from '../../../../lib/getDetailed'
import EpComment from '../../../../models/epComment'

export default handler
.post( async (req, res) => {
  const episode = await EpComment.findOne({ episode: req.query.id });
  const newComment = {
    user: req.user,
    content: req.body.content
  }
  
  episode.comments.push(newComment)
  
  episode.save()
    .then( async episode => res.json({ 
      comments: await getDetailedComments(episode.comments)
    }))
})