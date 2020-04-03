const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.PORT || 8080,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXPIRATION
  }
}
const getConfig = env => {
  let config = {}

  if (env === 'development') {
    config = {
      dbUrl: 'mongodb://localhost/komoto',
      origin: 'http://localhost:3000'
    }
  } else {
    config = {
      dbUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-t41bj.mongodb.net/test?retryWrites=true&w=majority`,
      origin: (origin, callback) => {
        const whitelist = [
          'https://komoto.xyz',
          'https://komotoapp.netlify.com'
        ]
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }
  }

  return {
    ...baseConfig,
    ...config
  }
}

export const config = getConfig(env)
