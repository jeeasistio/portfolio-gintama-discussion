import handler from '../../../lib/handler'
import { getDetailedPost } from '../../../lib/getDetailed'

export default handler
.get( async (req, res) => {
  const detailedPost = await getDetailedPost(req.query.id);
  res.json(detailedPost)
})