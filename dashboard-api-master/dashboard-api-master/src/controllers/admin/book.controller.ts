import { Request, Response } from 'express'
import path from 'path'
import { kt_genre as Genre } from '../../db/model/kt_genre'
import { bookService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { appendVideoPath } from '../../util/constants'

// Get All Books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks({
      order: [['bk_id', 'ASC']],
    })

    return successResponse(res, {
      message: 'Book List',
      data: {
        books,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Book
export const getBookById = async (req: Request, res: Response) => {
  try {
    let { bk_id } = req.params
    const book = await bookService.getBook({
      where: {
        bk_id,
      },
    })

    return successResponse(res, {
      message: 'Book Details founded',
      data: {
        book,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new Book
export const createBook = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    let { bk_genre } = body

    bk_genre = bk_genre.split(',')
    body['bk_genre'] = bk_genre
    
    let { bk_whoCanRead } = body

    bk_whoCanRead = bk_whoCanRead.split(',')
    body['bk_whoCanRead'] = bk_whoCanRead
    // upload file
    body['bk_audio'] =
      files?.['bk_audio'] &&
      path.join(
        (req.table_name || 'common') as string,
        'bk_audio',
        files?.['bk_audio']?.[0]?.filename,
      )
    body['bk_pdf'] =
      files?.['bk_pdf'] &&
      path.join(
        (req.table_name || 'common') as string,
        'bk_pdf',
        files?.['bk_pdf']?.[0]?.filename,
      )
    body['bk_previewVideo'] =
      files?.['bk_previewVideo'] &&
      path.join(
        (req.table_name || 'common') as string,
        'bk_previewVideo',
        files?.['bk_previewVideo']?.[0]?.filename,
      )
    body['bk_epub'] =
      files?.['bk_epub'] &&
      path.join(
        (req.table_name || 'common') as string,
        'bk_epub',
        files?.['bk_epub']?.[0]?.filename,
      )
    body['bk_preview'] =
      files?.['bk_preview'] &&
      path.join(
        (req.table_name || 'common') as string,
        'bk_preview',
        files?.['bk_preview']?.[0]?.filename,
      )
    // Append bookVideo Path
    if (body.bk_video) {
      const videoPath = appendVideoPath + body.bk_video
      body.bk_video = videoPath
    }
    // change empty fields to null-value
    setEmptyFieldsToNull(body)

    body.bk_price === null ? (body.bk_price = 0) : body.bk_price

    const Book = await bookService.createBook(body)

    return successResponse(res, {
      message: 'Book added Successfully',
      data: {
        Book,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Book
export const updateBook = async (req: Request, res: Response) => {
  try {
    let bk_id = req.params.bk_id as unknown as number
    let body = req.body

    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    let { bk_genre } = body

    bk_genre = bk_genre.split(',')
    body['bk_genre'] = bk_genre

    let { bk_whoCanRead } = body

    bk_whoCanRead = bk_whoCanRead.split(',')
    body['bk_whoCanRead'] = bk_whoCanRead

    // update file
    body['bk_audio'] = files?.['bk_audio']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'bk_audio',
          files?.['bk_audio']?.[0]?.filename,
        )
      : body['bk_audio_old']
    body['bk_pdf'] = files?.['bk_pdf']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'bk_pdf',
          files?.['bk_pdf']?.[0]?.filename,
        )
      : body['bk_pdf_old']
    body['bk_previewVideo'] = files?.['bk_previewVideo']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'bk_previewVideo',
          files?.['bk_previewVideo']?.[0]?.filename,
        )
      : body['bk_previewVideo_old']
    body['bk_epub'] = files?.['bk_epub']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'bk_epub',
          files?.['bk_epub']?.[0]?.filename,
        )
      : body['bk_epub_old']
    body['bk_preview'] = files?.['bk_preview']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'bk_preview',
          files?.['bk_preview']?.[0]?.filename,
        )
      : body['bk_preview_old']

    // Append bookVideo Path
    if (body.bk_video) {
      const videoPath = appendVideoPath + body.bk_video
      body.bk_video = videoPath
    }
    // change empty fields to null-value
    setEmptyFieldsToNull(body)

    body.bk_price === null ? (body.bk_price = 0) : body.bk_price

    const Book = await bookService.updateBook(
      {
        where: {
          bk_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Book Updated Successfully',
      data: {
        Book,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Book status
export const updateBookStatus = async (req: Request, res: Response) => {
  try {
    let bk_id = req.params.bk_id as unknown as number
    let bk_status = req.params.bk_status as unknown as boolean

    const Book = await bookService.updateBook(
      {
        where: {
          bk_id,
        },
      },
      {
        bk_status,
      },
    )

    return successResponse(res, {
      message: 'Book Status Updated Successfully',
      data: {
        Book,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    let { bk_id } = req.params

    await bookService.deleteBook({
      where: {
        bk_id,
      },
    })

    return successResponse(res, {
      message: 'Book Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
