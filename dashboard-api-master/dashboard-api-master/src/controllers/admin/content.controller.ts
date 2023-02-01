import { Request, Response } from 'express'
import path from 'path'
import { contentService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all Content
export const getAllContents = async (req: Request, res: Response) => {
  try {
    const content = await contentService.getAllContent({
      order: [['cm_id', 'ASC']],
    })

    return successResponse(res, {
      message: 'Content List',
      data: {
        content,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Content by id
export const getContentById = async (req: Request, res: Response) => {
  try {
    let { cm_id } = req.params
    const content = await contentService.getContent({
      where: {
        cm_id,
      },
    })

    return successResponse(res, {
      message: 'Content Details',
      data: {
        content,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new Content
export const createContent = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    // upload file
    body['cm_readingMaterial'] =
      files?.['cm_readingMaterial'] &&
      path.join(
        (req.table_name || 'common') as string,
        'cm_readingMaterial',
        files?.['cm_readingMaterial']?.[0]?.filename,
      )
    body['cm_video'] =
      files?.['cm_video'] &&
      path.join(
        (req.table_name || 'common') as string,
        'cm_video',
        files?.['cm_video']?.[0]?.filename,
      )
    const content = await contentService.createContent(body)

    return successResponse(res, {
      message: 'Content added Successfully',
      data: {
        content,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Content
export const updateContent = async (req: Request, res: Response) => {
  try {
    let cm_id = req.params.cm_id as unknown as number
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    // update file
    body['cm_readingMaterial'] = files?.['cm_readingMaterial']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'cm_readingMaterial',
          files?.['cm_readingMaterial']?.[0]?.filename,
        )
      : body['cm_readingMaterial_old']
    body['cm_video'] = files?.['cm_video']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'cm_video',
          files?.['cm_video']?.[0]?.filename,
        )
      : body['cm_video_old']

    const content = await contentService.updateContent(
      {
        where: {
          cm_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Content Updated Successfully',
      data: {
        content,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Content status
export const updateContentStatus = async (req: Request, res: Response) => {
  try {
    let cm_id = req.params.cm_id as unknown as number
    let cm_status = req.params.cm_status as unknown as boolean

    const content = await contentService.updateContent(
      {
        where: {
          cm_id,
        },
      },
      {
        cm_status,
      },
    )

    return successResponse(res, {
      message: 'Content Status Updated Successfully',
      data: {
        content,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Content
export const deleteContent = async (req: Request, res: Response) => {
  try {
    let { cm_id } = req.params

    await contentService.deleteContent({
      where: {
        cm_id,
      },
    })

    return successResponse(res, {
      message: 'Content Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
