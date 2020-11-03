import mongoose from 'mongoose'

const connection = {};

const connectDB = async (req, res, next) => {
  if (connection.isConnected) return next ? next() : null;
  
  const db = await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    }
  )
    
  connection.isConnected = db.connections[0].readyState
  console.log('Connected to database');
  
  return next ? next() : null;
}

export default connectDB;