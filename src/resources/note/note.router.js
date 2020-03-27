import { Router } from 'express'
import { createNote, getNotes } from './note.controller'

const router = Router()

// /api/note
router
  .route('/')
  .get(getNotes)
  .post(createNote)

// /api/note/:id
router
  .route('/:id')
  .get((req, res) => {
    res.send('got note')
  })
  .put((req, res) => {
    res.send('updated note')
  })
  .delete((req, res) => {
    res.send('deleted note')
  })

export const noteRouter = router
