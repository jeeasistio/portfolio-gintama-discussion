import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import PleaseLogin from '../../components/PleaseLogin'
import HFLayout from '../../components/HFLayout'
import AddPost from '../../components/global-thread/AddPost'
import Posts from '../../components/global-thread/Posts'
import handler from '../../lib/handler'
import { Container } from 'react-bootstrap'
import { getGlobalPosts } from '../../lib/getPosts'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

export default function GlobalThread({ posts }) {
  const { data, error, mutate } = useSWR('/api/posts', fetcher, {
    fallbackData: posts
  })
  const { isLoggedIn } = useContext(UserContext)

  return (
    <div>
      <Head>
        <title>Global Thread</title>
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
  await handler.run(req, res)

  const posts = await getGlobalPosts()

  return {
    props: JSON.parse(JSON.stringify({ posts }))
  }
}
