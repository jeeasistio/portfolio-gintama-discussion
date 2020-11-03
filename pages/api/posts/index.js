import handler from '../../../lib/handler'
import { getDetailedPosts } from '../../../lib/getDetailed'

export default handler
.get( async (req, res) => {
  const detailedPosts = await getDetailedPosts();
  res.json(detailedPosts);
})