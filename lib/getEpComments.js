import EpisodeComment from '../models/epComment'
import MovieComment from '../models/movieComment'
import OvaComment from '../models/ovaComment'
import { getDetailedComments } from './getDetailed'

export const getEpComments = async (episode) => {
  const comments = await EpisodeComment.findOne({ episode });
  const detailedComments = await getDetailedComments(comments.comments)
  return detailedComments;
}

export const getMovieComments = async (movie) => {
  const comments = await MovieComment.findOne({ movie });
  const detailedComments = await getDetailedComments(comments.comments)
  return detailedComments;
}

export const getOvaComments = async (ova) => {
  const comments = await OvaComment.findOne({ ova });
  const detailedComments = await getDetailedComments(comments.comments)
  return detailedComments;
}