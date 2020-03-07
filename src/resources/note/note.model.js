import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: 'New Note',
    maxlength: 50
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export const Note = mongoose.Model('note', noteSchema)
