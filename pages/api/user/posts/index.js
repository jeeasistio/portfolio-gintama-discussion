import handler from '../../../../lib/handler'
import User from '../../../../models/user'
import { addPost } from '../../../../lib/addPost';

export default handler
.get( async (req, res) => {
  const userPosts = await getUserPosts(req.user);
  res.json(userPosts);
})
.post( async (req, res) => {
  const { subject, content } = req.body;
  const userId = req.user

  const newPost = await addPost(userId, subject, content)
  
  newPost.save((err, post) => {
    if (err) return res.status(400).json(err)
    
    res.status(200).json(post)
  })
})