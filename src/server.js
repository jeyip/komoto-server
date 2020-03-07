if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express from 'express'
// import sendSMS from './utils/send_sms'
import cors from 'cors'
import { connect } from './utils/db'
import { noteRouter } from './resources/note/note.router'

var app = express()

app.use(cors())

app.use('/api/note', noteRouter)
app.post('/note', (req, res) => {
  const { text, phoneNumber } = req.body
  // sendSMS(text, phoneNumber)
  res.status(200).send('Sending note')
})

export const start = async () => {
  try {
    await connect()
    app.listen(process.env.PORT || 8080, () => {
      console.log('Server is running on PORT:', process.env.PORT || 8080)
    })
  } catch (e) {
    console.error(e)
  }
}
