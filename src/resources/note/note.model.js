import mongoose from 'mongoose'

const noteSchema = mongoose.Schema(
  {
    text: String,
    latitude: Number,
    longitude: Number,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    sentTo: String
  },
  { timestamps: true }
)

noteSchema.set('toJSON', {
  virtuals: true
})

export const Note = mongoose.model('note', noteSchema)
