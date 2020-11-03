import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import PleaseLogin from '../../components/PleaseLogin'
import HFLayout from '../../components/HFLayout'
import AddPost from '../../components/global-thread/AddPost'
import Posts from '../../components/global-thread/Posts'
import { getDetailedPosts } from '../../lib/getDetailed'
import handler from '../../lib/handler'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'

export default function GlobalThread({ posts }) {
  
  const { data, error, mutate } = useSWR('/api/posts', null, { initialData: posts })
  const { isLoggedIn } = useContext(UserContext);
  
  return (
    <div>
      <Head>
        <title>Gintama Discussion</title>
      </Head>
      
      <HFLayout>
        <Container fluid="md">
          <div className="my-4">
            <h2>Global Thread</h2>
            <h6>Discuss anything you want about gintama</h6>
          </div>
          {isLoggedIn && <AddPost mutate={mutate} posts={data} />}
          <Posts posts={data} />
          {!isLoggedIn && <PleaseLogin permission="add post" />}
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  await handler.run(req, res);
  const posts = await getDetailedPosts();
  
  return {
    props: JSON.parse(JSON.stringify({ posts }))
  }
}