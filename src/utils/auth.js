import jwt from 'jsonwebtoken'
import { User } from '../resources/user/user.model'
import { config } from '../config'

const createNewToken = id => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: { id } },
      config.secrets.jwt,
      {
        expiresIn: config.secrets.jwtExp
      },
      function(err, token) {
        if (err) {
          return reject(err)
        }

        return resolve(token)
      }
    )
  })
}

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, function(err, decoded) {
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
    const token = await createNewToken(user.id)
    return res.cookie('token', token).end()
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  let user

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).end()
  }

  // TODO: Handle email that already exists error
  try {
    user = await User.create({ firstName, lastName, email, password })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }

  if (!user) {
    return res.status(400).end()
  }

  const token = await createNewToken(user.id)
  res.cookie('token', token).end()
}

export const protect = async (req, res, next) => {
  if (!Boolean(req.cookies.token)) {
    return res.status(401).end()
  }

  try {
    const decodedToken = await verifyToken(req.cookies.token)
    const user = await User.findById(decodedToken.data.id)
      .select('-password')
      .lean()
      .exec()

    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({
      error: e.name
    })
  }
}
