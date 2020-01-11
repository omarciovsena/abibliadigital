import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema(
  {
    url: String,
    ip: String,
    user: String,
    version: String,
    text: String
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Request', RequestSchema)
