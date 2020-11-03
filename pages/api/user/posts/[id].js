import handler from '../../../../lib/handler'
import User from '../../../../models/user'
import { getDetailedPost } from '../../../../lib/getDetailed'

export default handler
.post( async (req, res) => {
  const postUser = await User.findOne({ 'posts._id': req.query.id });
  const post = postUser.posts.id(req.query.id);
  
  const newComment = {
    user: req.user,
    content: req.body.content
  }
  
  post.comments.push(newComment)
  
  postUser.save()
    .then(async user => res.json({ 
      msg: 'Comment Added', 
      post: await getDetailedPost(user.posts.id(req.query.id)) 
    }))
})