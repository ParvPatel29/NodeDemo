import { NextFunction, Request, Response } from 'express'
import { validationResult, ValidationError } from 'express-validator'
import { rmSync } from 'fs'
import path from 'path'
import { invalidDataResponse } from './apiResponse'

const errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors,
}: ValidationError) => {
  return {
    key: param,
    value: msg,
  }
}

// Validation Format
const validationErrorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  let result = validationResult(req).formatWith(errorFormatter)

  if (!result.isEmpty()) {
    let errors: { [key: string]: any } = {}

    let messageString: string[] = []
    for (let error of result.array()) {
      let { key, value } = error
      errors[key] = value

      messageString.push(value)
    }

    let message = messageString.join(', ')

    // remove uploaded file(s), if any
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    for (let file in files) {
      if (!files?.[file]?.length) {
        continue
      }

      let filesToDelete = files[file]
      for (let del of filesToDelete) {
        let { destination, filename } = del
        let location = path.join(destination, filename)
        rmSync(location)
      }
    }

    return invalidDataResponse(res, {
      message: message || 'Data Validation Error',
      error: {
        errors,
      },
    })
  }

  return next()
}

export default validationErrorMiddleware
