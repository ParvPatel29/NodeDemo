import { Request, Response } from 'express'
import { bookGenreService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// Get All Genre
export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await bookGenreService.getAllGenres({
      order: [['bg_id', 'ASC']],
    })

    return successResponse(res, {
      message: 'Genre List',
      data: {
        genres,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Genre
export const getGenreById = async (req: Request, res: Response) => {
  try {
    let { bg_id } = req.params
    const genre = await bookGenreService.getGenre({
      where: {
        bg_id,
      },
    })

    return successResponse(res, {
      message: 'Genre Details',
      data: {
        genre,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new Genre
export const createGenre = async (req: Request, res: Response) => {
  try {
    let body = req.body

    const genre = await bookGenreService.createGenre(body)

    return successResponse(res, {
      message: 'Genre added Successfully',
      data: {
        genre,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Genre
export const updateGenre = async (req: Request, res: Response) => {
  try {
    let bg_id = req.params.bg_id as unknown as number
    let body = req.body

    const genre = await bookGenreService.updateGenre(
      {
        where: {
          bg_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Genre Updated Successfully',
      data: {
        genre,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Genre status
export const updateGenreStatus = async (req: Request, res: Response) => {
  try {
    let bg_id = req.params.bg_id as unknown as number
    let bg_status = req.params.bg_status as unknown as boolean

    const genre = await bookGenreService.updateGenre(
      {
        where: {
          bg_id,
        },
      },
      {
        bg_status,
      },
    )

    return successResponse(res, {
      message: 'Genre Status Updated Successfully',
      data: {
        genre,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Genre
export const deleteGenre = async (req: Request, res: Response) => {
  try {
    let { bg_id } = req.params

    await bookGenreService.deleteGenre({
      where: {
        bg_id,
      },
    })

    return successResponse(res, {
      message: 'Genre Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
