import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import { useRouter } from 'next/router'
import HFLayout from '../../components/HFLayout'
import PleaseLogin from '../../components/PleaseLogin'
import Comments from '../../components/global-thread/Comments'
import AddComment from '../../components/global-thread/AddComment'
import PostDetails from '../../components/global-thread/PostDetails'
import { getDetailedPost } from '../../lib/getDetailed'
import handler from '../../lib/handler'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'

export default function Post({ post }) {
  
  const router = useRouter();
  const { data, error, mutate } = useSWR(`/api/posts/${post.id}`, null, { initialData: post })
  const { isLoggedIn } = useContext(UserContext);
  
  return (
    <div>
      <Head>
        <title>{data.subject}</title>
      </Head>
      
      <HFLayout>
        <Container fluid="md">
          <PostDetails post={data} />
          <Comments comments={data.comments} />
          {!isLoggedIn && <PleaseLogin permission="comment" />} 
          {isLoggedIn && <AddComment 
            postId={router.query.id} 
            mutate={mutate}
            post={data} />
          } 
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  await handler.run(req, res)
  const post = await getDetailedPost(params.id);
  
  return {
    props: JSON.parse(JSON.stringify({ post }))
  }
}