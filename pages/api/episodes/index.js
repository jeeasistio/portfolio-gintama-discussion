import handler from '../../../lib/handler'
import { getEpisodes } from "../../../lib/getEpisodes"

export default handler.get(async (req, res) => {
  const episodes = await getEpisodes()
  res.json(episodes)
})