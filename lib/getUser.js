import User from '../models/user'

export const getUser = async (userId) => {
  const user = await User.findById(userId)
  return user
}