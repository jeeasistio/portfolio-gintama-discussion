import mongoose from 'mongoose'

const episodeSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'Please enter a number']
  },
  title: {
    type: String,
    required: [true, 'Please enter a title']
  },
  jp_title: {
    type: String,
    required: [true, 'Please enter a japanese title']
  },
  image: {
    type: String,
    required: [true, 'Please enter an image']
  },
  content: {
    type: String,
    required: [true, 'Please enter a content']
  },
  episode_type: {
    type: String,
    required: [true, 'Please enter an episode type']
  },
  date_aired: {
    type: Date,
    required: [true, 'Please enter an aired date']
  }
})

const episodeModel =
  mongoose.models.Episode || mongoose.model('Episode', episodeSchema)

export default episodeModel
