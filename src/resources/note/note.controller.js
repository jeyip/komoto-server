import { Note } from './note.model'

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      createdBy: req.user._id
    })
      .select('-updatedAt')
      .exec()

    if (!notes) {
      return res.status(400).end()
    }

    return res.status(200).json({ notes })
  } catch (e) {
    return res.status(400).end()
  }
}

export const createNote = async (req, res) => {
  const { text, latitude, longitude } = req.body

  try {
    const note = await Note.create({
      text,
      latitude,
      longitude,
      createdBy: req.user._id
    })

    if (!note) {
      return res.status(400).end()
    }

    return res.send({ data: note })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}
