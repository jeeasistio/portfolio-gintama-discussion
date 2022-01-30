import { Col, Row, Card, Image, Button } from 'react-bootstrap'
import TextClamp from 'react-string-clamp'

const Episodes = ({ items }) => {
  return items.episodes.map((item, index) => (
    <Col key={index} xs="12" className="my-4">
      <Card>
        <Card.Header>{items.episode_type}</Card.Header>

        <Row noGutters>
          <Col
            xs={12}
            sm={4}
            className="d-flex justify-content-center align-items-center p-sm-2"
          >
            <Card.Img src={item.image} />
          </Col>

          <Col xs={12} sm={8} className="px-4 py-3">
            <h6>{item.title}</h6>
            <small className="text-muted mb-3 d-block">{item.jp_title}</small>
            <TextClamp className="px-2" text={item.content} lines={3} />
            <div className="d-flex justify-content-between align-items-center mt-4">
              <small className="text-muted">{item.date_aired}</small>
              <Button href={`/episodes-discussion/${item.id}`}>
                Read more
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  ))
}

export default Episodes
