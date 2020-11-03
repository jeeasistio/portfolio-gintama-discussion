import handler from '../../../../lib/handler'
import { getDetailedComments } from '../../../../lib/getDetailed'
import OvaComment from '../../../../models/ovaComment'

export default handler
.post( async (req, res) => {
  const ova = await OvaComment.findOne({ ova: req.query.id });
  const newComment = {
    user: req.user,
    content: req.body.content
  }
  
  ova.comments.push(newComment)
  
  ova.save()
    .then( async ova => res.json({ 
      comments: await getDetailedComments(ova.comments)
    }))
})