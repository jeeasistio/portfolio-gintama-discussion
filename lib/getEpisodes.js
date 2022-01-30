import Episode from '../models/episode'

export const getEpisode = async (episodeId) => {
  const episode = await Episode.findById(episodeId)
  return episode
}

export const getEpisodes = async () => {
  const episodes = await Episode.aggregate([
    { $group: { _id: '$episode_type', episodes: { $push: '$$ROOT' } } },
    { $project: { _id: 0, episodes: 1, episode_type: '$_id' } },
    { $sort: { episode_type: 1, aired_date: -1 } }
  ])
  return episodes
}