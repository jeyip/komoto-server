import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  }
})

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(error)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, function(err, same) {
      if (err) {
        return reject(err)
      }

      return resolve(same)
    })
  })
}

export const User = mongoose.model('user', userSchema)
