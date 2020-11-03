import handler from '../../../lib/handler'
import User from '../../../models/user'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'

export default handler
.post((req, res) => {
  const { email, password } = req.body;
  
  User.findOne({ email })
    .then(user => {
      if (!user) 
        return res.status(400).json({ msg: 'User does not exist' });
      
      user.verifyPassword(password)
        .then(isValid => {
          if (!isValid) 
            return res.status(400).json({ msg: 'Incorrect password' });
          
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          
          nookies.set({ res }, 'auth-token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
            httpOnly: true,
            sameSite: 'strict'
          })
          nookies.set({ res }, 'loggedInUser', user.username, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          })
          return res.json({ 
            msg: 'Login Successful', 
            user: {
              user: user.username,
              email: user.email
            }
          });
        })
    })
})