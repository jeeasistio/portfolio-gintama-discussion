import Link from 'next/link'
import ErrorMsg from '../ErrorMsg'
import { ListGroup } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const Comments = ({ comments }) => {
    return (
        <ListGroup variant="flush">
            {!comments.length && (
                <ErrorMsg size="large" message="No comments" />
            )}
            {comments.map((comment, index) => (
                <>
                    <ListGroup.Item
                        className="d-flex justify-content-between"
                        key={uuidv4()}
                    >
                        <div>
                            <p className="font-weight-bold">
                                <Link href={`/user/visit/${comment.user._id}`}>
                                    <a>{comment.user.username}</a>
                                </Link>
                            </p>
                            <p className="ml-2">{comment.content}</p>
                        </div>
                        <div className="h-100 d-flex align-self-end text-muted">
                            <p>
                                <time>
                                    {moment(comment.date_commented).fromNow()}
                                </time>
                            </p>
                        </div>
                    </ListGroup.Item>
                    <hr />
                </>
            ))}
        </ListGroup>
    )
}

export default Comments
