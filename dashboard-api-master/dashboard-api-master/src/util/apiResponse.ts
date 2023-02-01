import { Response } from 'express'
import { Error } from 'sequelize'

// Api Response

// Success Response
export const successResponse = (
  res: Response,
  json: {
    message?: string
    data?: object
  },
): Response => {
  let { message, data } = json
  message = message || 'Success'
  data = data || {}

  return res.status(200).json({
    status: true,
    message,
    data,
  })
}

// Unauthorized Response Token valid | inValid
export const unauthorizedResponse = (
  res: Response,
  json: {
    message?: string
    data?: object
    error?: any
  },
) => {
  let { message, data, error } = json
  message = message || 'Invalid Token'
  error = error || ''
  data = data || {}

  return res.status(401).json({
    status: false,
    message,
    data,
    error,
  })
}

// Forbidden Response Not Proper Authorization
export const forbiddenResponse = (
  res: Response,
  json: {
    message?: string
    data?: object
    error?: any
  },
) => {
  let { message, data, error } = json
  message = message || 'Access Denied'
  error = error || ''
  data = data || {}

  return res.status(403).json({
    status: false,
    message,
    data,
    error,
  })
}

// Data-Base Internal-Server-Error Response
export const internalServerErrorResponse = (
  res: Response,
  json: {
    message?: string
    data?: object
    error?: any
  },
): Response => {
  var { message, data, error } = json
  message = message || 'There was a problem processing the request'
  error = error || ''
  data = data || {}
  const sequelizeError = Error
  if (error instanceof sequelizeError) {
    const errorType = error.name
    switch (errorType) {
      case 'SequelizeForeignKeyConstraintError':
        error = error
        message = error.parent?.detail
        error = errorType
        break
      case 'SequelizeUniqueConstraintError':
        error = error
        message = error?.errors[0].message?.substr(3)
        error = errorType
        break
      default:
        break
    }
  }
  return res.status(500).json({
    status: false,
    message,
    data,
    error,
  })
}

// Data NotFound Response (Not Accepte Resource)
export const notFoundResponse = (
  res: Response,
  json: {
    message?: string
    data?: object
    error?: any
  },
): Response => {
  let { message, data, error } = json
  message = message || 'Resource Not Found'
  error = error || ''
  data = data || {}

  return res.status(404).json({
    status: false,
    message,
    data,
    error,
  })
}

// Invalid Data Response (Not Accepted Data-Resource)
export const invalidDataResponse = (
  res: Response,
  json: {
    message?: string
    data?: object
    error?: any
  },
): Response => {
  let { message, data, error } = json
  message = message || 'Invalid Data'
  error = error || ''
  data = data || {}

  return res.status(422).json({
    status: false,
    message,
    data,
    error,
  })
}
