import handler from '../../../../lib/handler'
import { getDetailedComments } from '../../../../lib/getDetailed'
import MovieComment from '../../../../models/movieComment'

export default handler
.post( async (req, res) => {
  const movie = await movieComment.findOne({ movie: req.query.id });
  const newComment = {
    user: req.user,
    content: req.body.content
  }
  
  movie.comments.push(newComment)
  
  movie.save()
    .then( async movie => res.json({ 
      comments: await getDetailedComments(movie.comments)
    }))
})