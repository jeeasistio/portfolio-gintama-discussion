import handler from '../../../lib/handler'
import { getPost } from '../../../lib/getPosts'

export default handler.get(async (req, res) => {
  const post = await getPost(req.query.id)
  res.json(post)
})
