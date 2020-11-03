import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../../../lib/UserContext'
import { useRouter } from 'next/router'
import HFLayout from '../../../components/HFLayout'
import PleaseLogin from '../../../components/PleaseLogin'
import EpisodeDetails from '../../../components/episodes-discussion/EpisodeDetails'
import Comments from '../../../components/global-thread/Comments'
import AddComment from '../../../components/episodes-discussion/AddComment'
import episodes from '../../../lib/episodes'
import handler from '../../../lib/handler'
import { getEpComments } from '../../../lib/getEpComments'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'

export default function Episode({ episode, comments }) {
  
  const router = useRouter();
  const { isLoggedIn } = useContext(UserContext);
  const { data, error, mutate } = useSWR(`/api/user/episode/${router.query.id}`, null, { initialData: comments })
  
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
          {isLoggedIn && <AddComment 
            episodeId={router.query.id} 
            mutate={mutate}
            comments={data} />
          } 
        </Container>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  handler.run(req, res);
  
  const episode = episodes.find(ep => ep.episode === params.id);
  const comments = await getEpComments(params.id);
  
  return {
    props: JSON.parse(JSON.stringify({ episode, comments }))
  }
}