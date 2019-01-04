import * as mongoose from 'mongoose'

export const catsSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  age: {
    type: Number
  }
})
