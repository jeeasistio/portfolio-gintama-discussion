import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import { useRouter } from 'next/router'
import HFLayout from '../../components/HFLayout'
import PleaseLogin from '../../components/PleaseLogin'
import EpisodeDetails from '../../components/episodes-discussion/EpisodeDetails'
import Comments from '../../components/global-thread/Comments'
import AddComment from '../../components/episodes-discussion/AddComment'
import handler from '../../lib/handler'
import { getEpisodeComments } from '../../lib/getComments'
import { getEpisode } from '../../lib/getEpisodes'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

export default function Episode({ episode, comments }) {
  const router = useRouter()
  const { isLoggedIn } = useContext(UserContext)
  const { data, error, mutate } = useSWR(
    `/api/episodes/comments/${router.query.id}`,
    fetcher,
    { fallbackData: comments }
  )

  return (
    <div>
      <Head>
        <title>{episode.title}</title>
      </Head>

      <HFLayout>
        <Container fluid="md">
          <EpisodeDetails episode={episode} />
          <Comments comments={data} />
          {!isLoggedIn && <PleaseLogin permission="comment" />}
          {isLoggedIn && <AddComment episodeId={router.query.id} mutate={mutate} comments={data} />}
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  handler.run(req, res)

  const comments = await getEpisodeComments(params.id)
  const episode = await getEpisode(params.id)

  return {
    props: JSON.parse(JSON.stringify({ episode, comments }))
  }
}
