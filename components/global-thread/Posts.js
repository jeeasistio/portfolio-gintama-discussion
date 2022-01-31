import Link from 'next/link'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import TextClamp from 'react-string-clamp'

const Posts = ({ posts }) => {
  return (
    <Row xs={1}>
      {posts.map((post) => (
        <Col key={uuidv4()} className="my-2">
          <Card>
            <Card.Body>
              <Card.Title>{post.subject}</Card.Title>
              <Card.Subtitle className="mb-3">
                <Link href={`/user/visit/${post.user._id}`}>
                  <a className="font-weight-light text-muted">
                    {post.user.username}
                  </a>
                </Link>
              </Card.Subtitle>
              <TextClamp className="px-2" text={post.content} lines={3} />
            </Card.Body>

            <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
              <Button href={`/global-thread/${post._id}`} variant="primary">
                Read more
              </Button>
              <time>{moment(post.date_posted).fromNow()}</time>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Posts
