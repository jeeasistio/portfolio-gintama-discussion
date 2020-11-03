import Link from 'next/link'
import { Jumbotron } from 'react-bootstrap'
import moment from 'moment'

const PostDetails = ({ post }) => {
  return (
    <Jumbotron className="mt-3 p-4">
      <h3>{post.subject}</h3> 
      <p className="px-2 py-3">{post.content}</p>
      <small className="text-muted">
        Posted by&nbsp;
        <Link href={`/user/${post.user.username}`}><a>{post.user.username}</a></Link>&nbsp;
        <time>{moment(post.date_posted).fromNow()}</time>
      </small>
    </Jumbotron>
  )
}

export default PostDetails;