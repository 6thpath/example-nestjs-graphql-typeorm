import { Document } from 'mongoose'

export interface Owner extends Document {
  _id: string
  readonly name: string
}