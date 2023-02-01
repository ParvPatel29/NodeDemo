import config from 'config'
import jwt from 'jsonwebtoken'

const options: any = config.get('token')

// Generate Admin Token

export const generateToken = (payload: {
  id: number
  userName: string
}): string => {
  const token = jwt.sign(payload, options.secretKey, {
    algorithm: 'HS256',
    expiresIn: options.accessTokenLife,
  })

  return token
}
