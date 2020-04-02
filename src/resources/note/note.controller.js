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

    return res.json({ notes })
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

    return res.send({ note })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const updateNote = async (req, res) => {
  let id

  if (req.params && req.params.id) {
    id = req.params.id
  } else {
    return res.status(400).end()
  }

  try {
    const updated = await Note.findByIdAndUpdate(id, req.body)
    return res.json({ id: updated.id })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const deleteNote = async (req, res) => {
  let id

  if (req.params && req.params.id) {
    id = req.params.id
  } else {
    return res.status(400).end()
  }

  try {
    const removed = await Note.findByIdAndDelete(id)
    return res.json({ id: removed.id })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}
