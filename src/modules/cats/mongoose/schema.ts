import * as mongoose from 'mongoose'

export const catsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  age: {
    type: Number
  }
})
