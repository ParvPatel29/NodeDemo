import { authService, gesMemberService } from '../../db/services'
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
import { kt_GESOffice as GESOffice } from '../../db/model/kt_GESOffice'

// Login GESMember
export const loginGESMember = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body

    const GESMember = await gesMemberService.getGESMember({
      where: {
        [Op.or]: {
          gm_email: userName,
          gm_fullName: userName,
        },
      },
      include: {
        model: GESOffice,
        as: 'gm_gesOffice',
        attributes: [
          'go_id',
          'go_officeLevel',
          'go_officeTitle',
          'go_region',
          'go_district',
          'go_circuit',
          'go_email',
        ],
      },
    })

    if (GESMember?.gm_status === false) {
      return unauthorizedResponse(res, {
        message: 'Invalid User Status',
      })
    }

    if (!GESMember) {
      return notFoundResponse(res, {
        message: 'Invalid Username',
      })
    }

    if (!(GESMember.gm_password === md5(password))) {
      return notFoundResponse(res, {
        message: 'Invalid Password',
      })
    }

    // Generate Token
    const accessToken = generateToken({
      id: GESMember.gm_id,
      userName: userName,
    })

    // GESMemberDetails Obj
    const memberDetails: { GESMember: object | any; token: string } = {
      GESMember,
      token: accessToken,
    }
    delete memberDetails.GESMember.dataValues.gm_password

    // addToken in database
    const tokenObj: {
      kn_userId: number
      kn_token: string
      kn_type: string
    } = {
      kn_userId: GESMember.gm_id,
      kn_token: accessToken,
      kn_type: 'dash_GESAdmin',
    }

    if (GESMember) {
      await authService.createToken(tokenObj)
    }

    return successResponse(res, {
      message: 'User Login Successful',
      data: memberDetails,
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

export const logoutGESMember = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.substr(7)

    await authService.deleteToken({
      where: { kn_token: token, kn_type: 'dash_GESAdmin' },
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
