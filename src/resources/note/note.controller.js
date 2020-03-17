import { Note } from './note.model'

export const createNote = async (req, res) => {
  const { title, text, sentTo } = req.body

  try {
    const note = await Note.create({
      title,
      text,
      sentTo,
      createdBy: req.user._id
    })

    if (!note) {
      return res.status(400).send('Something went wrong')
    }

    return res.send({ data: note })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}
