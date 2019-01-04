import * as mongoose from 'mongoose'

export const ownerSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  }
})