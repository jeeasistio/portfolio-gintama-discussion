import Head from 'next/head'
import HFLayout from '../../components/HFLayout'
import Episodes from '../../components/episodes-discussion/Episodes'
import episodes from '../../lib/episodes'
import ovas from '../../lib/ovas'
import movies from '../../lib/movies'
import handler from '../../lib/handler'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'

export default function EpisodesDiscussion({ episodes, ovas, movies }) {
  return (
    <div>
      <Head>
        <title>Episodes Discussion</title>
      </Head>
      
      <HFLayout>
        <Container fluid="md">
          <div className="my-4">
            <h2>Episodes Discussion</h2>
            <h6>Discuss your favorite episodes</h6>
          </div>
          <Image style={{ width: 300 }} className="d-block mx-auto my-4" src="/images/gintama.jpg" rounded />
          <div className="p-2 text-justify">
            <p>
              The Amanto, aliens from outer space, have invaded Earth and taken over feudal Japan. As a result, a prohibition on swords has been established, and the samurai of Japan are treated with disregard as a consequence.
            </p>
            <p>  
              However one man, Gintoki Sakata, still possesses the heart of the samurai, although from his love of sweets and work as a yorozuya, one might not expect it. Accompanying him in his jack-of-all-trades line of work are Shinpachi Shimura, a boy with glasses and a strong heart, Kagura with her umbrella and seemingly bottomless stomach, as well as Sadaharu, their oversized pet dog. Of course, these odd jobs are not always simple, as they frequently have run-ins with the police, ragtag rebels, and assassins, oftentimes leading to humorous but unfortunate consequences.
            </p>
          </div>
        </Container>
        <div id="episodes">
          <Navbar sticky="top" bg="primary" variant="dark">
            <Navbar.Brand>Episodes</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link active={false} href="#ovas">OVAs</Nav.Link>
              <Nav.Link active={false} href="#movies">Movies</Nav.Link>
            </Nav>
          </Navbar>
          <Container fluid="md">
            <Episodes items={episodes} />
          </Container>
        </div>
        
        <div id="ovas">
          <Navbar sticky="top" bg="primary" variant="dark">
            <Navbar.Brand>OVAs</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link active={false} href="#episodes">Episodes</Nav.Link>
              <Nav.Link active={false} href="#movies">Movies</Nav.Link>
            </Nav>
          </Navbar>
          <Container fluid="md">
            <Episodes items={ovas} />
          </Container>
        </div>
        
        <div id="movies">
          <Navbar sticky="top" bg="primary" variant="dark">
            <Navbar.Brand>Movies</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link active={false} href="#episodes">Episodes</Nav.Link>
              <Nav.Link active={false} href="#ovas">OVAs</Nav.Link>
            </Nav>
          </Navbar>
          <Container fluid="md">
            <Episodes items={movies} />
          </Container>
        </div>
      </HFLayout>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  await handler.run(req, res);
  
  return {
    props: JSON.parse(JSON.stringify({ episodes, ovas, movies }))
  }
}