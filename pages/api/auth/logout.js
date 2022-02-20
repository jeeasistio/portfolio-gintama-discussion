import handler from '../../../lib/handler'
import nookies from 'nookies'

export default handler
.post((req, res) => {
  nookies.destroy({ res }, 'auth-token', { path: '/' })
  nookies.destroy({ res }, 'loggedInUser', { path: '/' })
  res.status(200).json({ msg: 'Logged Out '})
})