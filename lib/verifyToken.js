import jwt from 'jsonwebtoken'
import nookies from 'nookies'

const verifyToken = (req, res, next) => {
  const token = nookies.get({ req })['auth-token'];
  
  if (!token) 
    return res.status(400).json({ msg: 'No authentication token' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    return next ? next() : null;
  } catch (e) {
    res.status(400).json({ msg: 'Please login'});
  } 
}

export default verifyToken;