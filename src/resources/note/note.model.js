import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: 'New Note',
    maxlength: 50
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  }
})

export const Note = mongoose.Model('note', noteSchema)
