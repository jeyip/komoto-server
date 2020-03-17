import mongoose from 'mongoose'

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      default: 'New Note',
      maxlength: 50
    },
    text: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    sentTo: String
  },
  { timestamps: true }
)

export const Note = mongoose.model('note', noteSchema)
