import express from 'express'
// import sendSMS from './utils/send_sms'
import cors from 'cors'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import { config } from './config'
import { connect } from './utils/db'
import { noteRouter } from './resources/note/note.router'
import { signin, signup, protect } from './utils/auth'

var app = express()
app.use(cors({ credentials: true, origin: config.origin }))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signin', signin)
app.post('/signup', signup)

app.use('/api', protect)
app.use('/api/note', noteRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log('Server is running on PORT:', config.port)
    })
  } catch (e) {
    console.error(e)
  }
}
