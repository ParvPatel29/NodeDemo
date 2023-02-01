import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_teacherAttributes as TeacherAttributes,
  kt_teacherCreationAttributes as TeacherCreationAttributes,
  kt_teacher as Teacher,
} from '../model/init-models'
import {
  kt_liveSessionAttributes as LiveSessionAttributes,
  kt_liveSessionCreationAttributes as LiveSessionCreationAttributes,
  kt_liveSession as LiveSession,
} from '../model/init-models'

// Create a New LiveSession
export const createLiveSession = async (
  data: LiveSessionCreationAttributes,
): Promise<LiveSession> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_liveSession = await LiveSession.create(data, { transaction })
    await transaction.commit()
    return kt_liveSession
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Live Session
export const getLiveSession = async (
  options: FindOptions<LiveSession>,
): Promise<LiveSession | null> => {
  try {
    const kt_liveSession = await LiveSession.findOne(options)
    return kt_liveSession
  } catch (error) {
    throw error
  }
}

export const updateLiveSession = async (
  options: UpdateOptions<LiveSessionAttributes>,
  data: Partial<LiveSession>,
): Promise<[affectedCount: number, affectedRows: LiveSession[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await LiveSession.update(data, {
      ...options,
      transaction,
      returning: true,
    })

    await transaction.commit()
    return updatedData[1]
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get All Live Session
export const getAllLiveSession = async (
  options: FindOptions<LiveSession>,
): Promise<LiveSession[] | []> => {
  const team = await LiveSession.findAll(options)
  return team
}

// delete Live Session
export const deleteLiveSession = async (
  options: DestroyOptions<LiveSession>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await LiveSession.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count Live Session
export const countLiveSession = async (
  options: FindOptions<LiveSession>,
): Promise<LiveSession | number> => {
  const liveSessoin = await LiveSession.count(options)
  return liveSessoin
}
