import { Document } from 'mongoose'

export interface Owner extends Document {
  readonly _id: string
  readonly name: string
}