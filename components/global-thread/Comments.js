import Link from 'next/link'
import ErrorMsg from '../ErrorMsg'
import { ListGroup } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

const Comments = ({ comments }) => {
  return (
    <ListGroup variant="flush">
      {!comments.length && <ErrorMsg size="large" message="No comments"/>}
      {comments.map(comment => (
          <ListGroup.Item key={uuidv4()}>
            <p className="font-weight-bold">
              <Link href={`/user/visit/${comment.user.userId}`}>
                <a>
                  {comment.user.username}
                </a>
              </Link>
            </p>
            <p className="ml-2">{comment.content}</p>
          </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Comments;