import handler from '../../../lib/handler'
import nookies from 'nookies'

export default handler
.post((req, res) => {
  res.setHeader('Set-Cookie', 'auth-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  res.setHeader('Set-Cookie', 'loggedInUser=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  res.status(200).json({ msg: 'Logged Out '})
})