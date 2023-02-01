import { adminTeamService, authService } from '../../db/services'
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

// Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body

    let user = await adminTeamService.getAdminTeamMember({
      where: {
        [Op.or]: {
          at_email: userName,
          at_fullName: userName,
        },
      },
      raw: true,
    })

    if (user?.at_status === false) {
      return unauthorizedResponse(res, {
        message: 'Invalid User Status',
      })
    }

    if (!user) {
      return notFoundResponse(res, {
        message: 'Invalid Username',
      })
    }

    if (!(user.at_password === md5(password))) {
      return notFoundResponse(res, {
        message: 'Invalid Password',
      })
    }

    // Generate Token
    const accessToken = generateToken({
      id: user.at_id,
      userName: userName,
    })

    // userDetail Obj
    const userDetails: { user: object | any; token: string } = {
      user,
      token: accessToken,
    }

    delete userDetails.user.at_password

    // addToken in database
    const tokenObj: {
      kn_userId: number
      kn_token: string
      kn_type: string
    } = {
      kn_userId: user.at_id,
      kn_token: accessToken,
      kn_type: 'dash_admin',
    }

    if (user) {
      await authService.createToken(tokenObj)
    }

    return successResponse(res, {
      message: 'User Login Successful',
      data: userDetails,
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.substr(7)

    await authService.deleteToken({
      where: { kn_token: token, kn_type: 'dash_admin' },
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
