import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import HFLayout from '../../components/HFLayout'
import AddPost from '../../components/global-thread/AddPost'
import Posts from '../../components/global-thread/Posts'
import { getUserPosts } from '../../lib/getDetailed'
import handler from '../../lib/handler'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'

export default function User({ posts }) {
  
  const { data, error, mutate } = useSWR('/api/user/posts', null, { initialData: posts })
  const { loggedInUser } = useContext(UserContext);
  
  return (
    <div>
      <Head>
        <title>{loggedInUser}</title>
      </Head>
      
      <HFLayout>
        <Container fluid="md">
          <div className="my-4">
            <h1>{loggedInUser}</h1>
          </div>
          <AddPost mutate={mutate} posts={data} />
          <h5 className="text-center mt-5">Timeline Posts</h5>
          <Posts posts={data} />
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  await handler.run(req, res);
  const posts = await getUserPosts(req.user);
  
  return {
    props: JSON.parse(JSON.stringify({ posts }))
  }
}