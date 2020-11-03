import nc from 'next-connect'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './connectDB'
import verifyToken from './verifyToken'

const commonDev = nc().use(cors()).use(morgan('dev')).use(connectDB)
const commonProd = nc().use(connectDB)
const auth1 = nc().use('/api/user', verifyToken)
const auth2 = nc().use('/user', verifyToken)

export default nc({
  onError(err, req, res) {
    res.status(500).json({ msg: 'Something Went Wrong', error: err.message })
  },
  onNoMatch(req, res) {
    res.status(400).json({ msg: `Method ${req.method} not allowed` })
  }
})
.use(process.env.NODE_ENV === 'development' ? commonDev : commonProd)
.use(auth1).use(auth2)