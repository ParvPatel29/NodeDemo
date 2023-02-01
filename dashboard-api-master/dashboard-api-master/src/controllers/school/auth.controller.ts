import { adminTeamService, authService, schoolService } from '../../db/services'
import { Request, Response } from 'express'

// Response Handler
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '../../util/apiResponse'
import md5 from 'md5'
import { Op } from 'sequelize'
import { generateToken } from '../../auth/common/generateToken'

// Login school
export const loginSchool = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body

    const school = await schoolService.getSchool({
      where: {
        [Op.or]: {
          sc_email: userName,
          sc_schoolName: userName,
        },
      },
    })

    if (school?.sc_status === false) {
      return unauthorizedResponse(res, {
        message: 'Invalid School Status',
      })
    }

    if (!school) {
      return notFoundResponse(res, {
        message: 'Invalid Username',
      })
    }

    if (!(school.sc_password === md5(password))) {
      return notFoundResponse(res, {
        message: 'Invalid Password',
      })
    }

    // Generate Token
    const accessToken = generateToken({
      id: school.sc_id,
      userName: userName,
    })

    // schoolDetail Obj
    const schoolDetails: { school: object | any; token: string } = {
      school,
      token: accessToken,
    }
    delete schoolDetails.school.dataValues.sc_password

    // addToken in database
    const tokenObj: {
      kn_userId: number
      kn_token: string
      kn_type: string
    } = {
      kn_userId: school.sc_id,
      kn_token: accessToken,
      kn_type: 'dash_schoolAdmin',
    }

    if (school) {
      await authService.createToken(tokenObj)
    }

    return successResponse(res, {
      message: 'User Login Successful',
      data: schoolDetails,
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

export const logoutSchool = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.substr(7)

    await authService.deleteToken({
      where: { kn_token: token, kn_type: 'dash_schoolAdmin' },
    })

    return successResponse(res, {
      message: 'You have been logged out successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
