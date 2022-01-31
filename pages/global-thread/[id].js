import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import { useRouter } from 'next/router'
import HFLayout from '../../components/HFLayout'
import PleaseLogin from '../../components/PleaseLogin'
import Comments from '../../components/global-thread/Comments'
import AddComment from '../../components/global-thread/AddComment'
import PostDetails from '../../components/global-thread/PostDetails'
import handler from '../../lib/handler'
import { getPost } from '../../lib/getPosts'
import { getPostComments } from '../../lib/getComments'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

export default function Post({ post, comments }) {
  
  const router = useRouter();
  const { data, error, mutate } = useSWR(`/api/posts/comments/${router.query.id}`, fetcher, { fallbackData: comments })
  const { isLoggedIn } = useContext(UserContext);
  
  return (
    <div>
      <Head>
        <title>{data.subject}</title>
      </Head>
      
      <HFLayout>
        <Container fluid="md">
          <PostDetails post={post} />
          <Comments comments={data} />
          {!isLoggedIn && <PleaseLogin permission="comment" />} 
          {isLoggedIn && <AddComment 
            postId={router.query.id} 
            mutate={mutate}
            comments={data} />
          } 
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  await handler.run(req, res)

  const comments = await getPostComments(params.id)
  const post = await getPost(params.id);
  
  return {
    props: JSON.parse(JSON.stringify({ post, comments }))
  }
}