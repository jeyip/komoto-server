if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express from 'express'
// import sendSMS from './utils/send_sms'
import cors from 'cors'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import { connect } from './utils/db'
import { noteRouter } from './resources/note/note.router'
import { userRouter } from './resources/user/user.router'
import { signin, signup, protect } from './utils/auth'

var app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signin', signin)
app.post('/signup', signup)

app.use('/api', protect)
app.use('/api/note', noteRouter)
app.use('/api/user', userRouter)

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
