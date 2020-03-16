import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

const createNewToken = id => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.JWT_SECRET, function(err, token) {
      if (err) {
        return reject(err)
      }

      return resolve(token)
    })
  })
}

// TODO: finish verify token
const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return reject(err)
      }

      return resolve(decoded)
    })
  })
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).end()
  }

  const user = await User.findOne({ email }).exec()

  if (!user) {
    return res.status(400).end()
  }

  const match = await user.checkPassword(password)

  if (!match) {
    return res.status(401).end()
  } else {
    const token = await createNewToken({ id: user.id })
    return res.json({ token })
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).end()
  }

  // TODO: Handle email that already exists error
  const user = await User.create({ firstName, lastName, email, password })

  if (!user) {
    return res.status(400).end()
  }

  const token = await createNewToken({ id: user.id })
  res.json({ token })
}

// TODO: Create protect middleware
export const protect = async (req, res) => {}
