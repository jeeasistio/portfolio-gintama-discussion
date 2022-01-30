import handler from '../../../../lib/handler'
import { getEpisodeComments } from "../../../../lib/getComments"

export default handler.get(async (req, res) => {
  const comments = await getEpisodeComments(req.query.id)
  res.json(comments)
})