import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import * as path from 'path'
import * as fs from 'fs'

export const diskStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) => {
    try {
      let location = path.join(
        process.cwd(),
        'uploads',
        (req.table_name || 'common') as string,
        file.fieldname || '',
      )
      fs.mkdirSync(location, { recursive: true })
      return callback(null, location)
    } catch (error: any) {
      console.trace(error)
      return callback(error, '')
    }
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    try {
      let ext = path.extname(file.originalname)
      let filename = Date.now() + ext
      return callback(null, filename)
    } catch (error: any) {
      console.trace(error)
      return callback(error, '')
    }
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  try {
    if (
      ![
        'image/jpg',
        'image/png',
        'image/jpeg',
        'image/gif',
        'application/pdf',
        'video/mp4',
        'video/mpeg',
        'video/x-msvideo',
        'audio/wav',
        'audio/mp3',
        'audio/mpeg',
        'application/epub+zip',
      ].includes(file.mimetype)
    ) {
      return callback(new Error('Invalid File Type'))
    }
    return callback(null, true)
  } catch (error: any) {
    console.trace(error)
    return callback(error)
  }
}

export const fileUpload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
})
