import handler from '../../../lib/handler'
import User from '../../../models/user'

export default handler
.post( async (req, res) => {
  const { username, email, password } = req.body;
  
  const newUser = new User({
    username, email, password
  })
  newUser.save()
    .then(user => res.json({ 
      msg: 'Registration Successful', 
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    }))
    .catch(err => {
      const firstErr = err.errors[Object.keys(err.errors)[0]];
      return res.status(400).json({ msg: firstErr.message })
    })
})