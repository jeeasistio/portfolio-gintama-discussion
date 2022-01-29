import handler from '../../../lib/handler'
import { getGlobalPosts } from '../../../lib/getPosts'

export default handler.get(async (req, res) => {
  const posts = await getGlobalPosts()
  res.json(posts)
})
