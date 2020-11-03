import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../../lib/UserContext'
import HFLayout from '../../../components/HFLayout'
import Posts from '../../../components/global-thread/Posts'
import { getUserAndPosts } from '../../../lib/getDetailed'
import handler from '../../../lib/handler'
import { Container } from 'react-bootstrap'

export default function Visit({ user, posts }) {
  return (
    <div>
      <Head>
        <title>{user}</title>
      </Head>
      
      <HFLayout>
        <Container fluid="md">
          <div className="my-4">
            <h1>{user}</h1>
          </div>
          <h5 className="text-center mt-5">Timeline Posts</h5>
          <Posts posts={posts} />
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ req, res, params }) {
  await handler.run(req, res);
  const { user, posts } = await getUserAndPosts(params.user);
  
  
  return {
    props: JSON.parse(JSON.stringify({ user, posts }))
  }
}