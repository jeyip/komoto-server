import { Router } from 'express'
import { createNote, deleteNote, getNotes, updateNote } from './note.controller'

const router = Router()

// /api/note
router
  .route('/')
  .get(getNotes)
  .post(createNote)

// /api/note/:id
router
  .route('/:id')
  .patch(updateNote)
  .delete(deleteNote)

export const noteRouter = router
