import { Document } from 'mongoose'

export interface Cat extends Document {
  _id: string
  readonly name: string
  readonly age: number
}