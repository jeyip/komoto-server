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
      dbUrl: 'mongodb://localhost/komoto'
    }
  } else {
    config = {
      dbUrl: ''
    }
  }

  return {
    ...baseConfig,
    ...config
  }
}

export const config = getConfig(env)
