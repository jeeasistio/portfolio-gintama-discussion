import handler from '../../../../lib/handler'
import { getDetailedPost, getUserPosts } from '../../../../lib/getDetailed'
import User from '../../../../models/user'

export default handler
.get( async (req, res) => {
  const userPosts = await getUserPosts(req.user);
  res.json(userPosts);
})
.post( async (req, res) => {
  const { subject, content } = req.body;
  const postUser = await User.findById(req.user);
  
  const newPost = {
    user: postUser.id, 
    subject, 
    content, 
    date_posted: Date.now()
  }
  
  postUser.posts.push(newPost);
  const postedPost = postUser.getChanges().$push.posts.$each[0]
  
  postUser.save()
    .then( async user => res.json({ 
      msg: 'New Post Added', 
      post: await getDetailedPost(postedPost) 
    }))
})