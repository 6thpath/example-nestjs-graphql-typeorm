import * as mongoose from 'mongoose'

export const ownerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String
  }
})