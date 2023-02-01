import Jwt, { JwtPayload } from 'jsonwebtoken'
import config from 'config'
import { NextFunction, Request, Response } from 'express'
import {
  forbiddenResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
} from '../../util/apiResponse'
import { authService } from '../../db/services'

const options: any = config.get('token')

// verify Token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // For updating profilePic from Student App

    if (req.query?.from === 'studentApp') {
      if (req.query.key !== options?.updateProfileKey) {
        return unauthorizedResponse(res, {
          message: 'Invalid Secret Key for profile update',
        })
      }

      req.token = { id: req.params?.st_id } as JwtPayload
      return next()
    }

    if (req.query?.from === 'teacherApp') {
      if (req.query.key !== options?.updateProfileKey) {
        return unauthorizedResponse(res, {
          message: 'Invalid Secret Key for profile update',
        })
      }

      req.token = { id: req.params?.tc_id } as JwtPayload
      return next()
    }

    if (req.query?.from === 'parentApp') {
      if (req.query.key !== options?.updateProfileKey) {
        return unauthorizedResponse(res, {
          message: 'Invalid Secret Key for profile update',
        })
      }

      req.token = { id: req.params?.pt_id } as JwtPayload
      return next()
    }

    if (req.query?.from === 'publisherApp') {
      if (req.query.key !== options?.updateProfileKey) {
        return unauthorizedResponse(res, {
          message: 'Invalid Secret Key for profile update',
        })
      }

      req.token = { id: req.params?.pb_id } as JwtPayload
      return next()
    }

    const token: string | undefined =
      req.headers['authorization'] || req.headers['x-access-token']

    const userToken = req.headers['authorization']?.substr(7)

    // get token
    const ktToken = await authService.getToken({
      where: { kn_token: userToken },
    })

    //  unauthoRization userAccess message
    if (!ktToken) {
      return unauthorizedResponse(res, {
        message: 'Unauthorized Access',
      })
    }

    if (!token) {
      return forbiddenResponse(res, {
        message: 'Token Missing',
      })
    }

    if (!token.toLowerCase().startsWith('bearer')) {
      return unauthorizedResponse(res, {
        message: 'Invalid Token',
      })
    }

    const bearerToken: string = token.split(' ')[1]

    if (!bearerToken) {
      return unauthorizedResponse(res, {
        message: 'Invalid Token',
      })
    }

    const decodedToken = Jwt.verify(
      bearerToken,
      options.secretKey,
    ) as JwtPayload
    req.token = decodedToken
    return next()
  } catch (error: any) {
    if (error instanceof Jwt.JsonWebTokenError) {
      return unauthorizedResponse(res, {
        message: `${error.message}`,
        error: error,
      })
    }
    return internalServerErrorResponse(res, { error: error })
  }
}
