import { Navbar } from 'react-bootstrap'
import HLayout from './HLayout'

export default function HFLayout({ children }) {
  return (
    <>
      <HLayout>
        { children }
        <Navbar
          sticky="bottom"
          className="w-100 p-4 d-flex flex-column-reverse flex-sm-row justify-content-sm-between align-items-center">
          <p className="text-muted">&copy; 2020</p>
          <p className="text-muted">Privacy and Terms</p>
        </Navbar>
      </HLayout>
    </>
  )
}