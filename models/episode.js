import { SchemaType } from 'mongoose'
import { Schema, models, model } from 'mongoose'

const episodeSchema = new Schema({
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

export default models.Episode || model('Episode', episodeSchema)
