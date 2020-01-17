import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  notifications: Boolean,
  lastLogin: Date
})

export default mongoose.model('User', UserSchema)
