import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/UserContext'
import { useRouter } from 'next/router'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios'

export default function HLayout({ children }) {
  
  const router = useRouter();
  const { isLoggedIn, loggedInUser, logout } = useContext(UserContext);
  
  const logoutFunc =  () => {
    axios.post('/api/auth/logout')
      .then(res => {
        router.push('/global-thread')
        logout();
      })
  }
  
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Navbar.Brand href="/">Gintama Discussion</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto" activeKey={router.pathname}>
            <Nav.Link href="/global-thread">
              Global Thread
            </Nav.Link>
            <Nav.Link href="/episodes-discussion">
              Episodes Discussion
            </Nav.Link>
            <NavDropdown title="Account" alignRight>
              {!isLoggedIn && 
                <>
                  <NavDropdown.Item href="/auth/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/auth/register">Register</NavDropdown.Item>
                </>
              }
              {isLoggedIn &&
                <>
                  <NavDropdown.Item href={`/user/${loggedInUser}`}>
                    {loggedInUser}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutFunc} className="text-danger">
                    Logout
                  </NavDropdown.Item>
                </>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      { children }
    </>
  )
}