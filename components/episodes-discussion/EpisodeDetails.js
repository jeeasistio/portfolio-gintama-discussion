import { Jumbotron, Image } from 'react-bootstrap'
import moment from 'moment'

const EpisodeDetails = ({ episode }) => {
  return (
    <Jumbotron className="mt-3 p-4">
      <h3>{episode.title}</h3>
      <h6 className="text-muted mb-4">{episode.jp_title}</h6>
      <Image src={episode.image} rounded className="d-block mx-auto my-2 mw-100" />
      <p className="px-2 py-3">{episode.content}</p>
      <small className="text-muted">
        <time>Date aired: {moment(episode.date_aired).format('MMM DD[,] YYYY')}</time>
      </small>
    </Jumbotron>
  )
}

export default EpisodeDetails;