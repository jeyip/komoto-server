import { Router } from 'express'

const router = Router()

// /api/note
router
  .route('/')
  .get((req, res) => {
    res.send('got notes')
  })
  .post((req, res) => {
    res.send('create notes')
  })

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
