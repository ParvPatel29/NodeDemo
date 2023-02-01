import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_sendMessageAttributes as SendMessageAttributes,
  kt_sendMessageCreationAttributes as SendMessageCreationAttributes,
  kt_sendMessage as SendMessage,
} from '../model/init-models'

// Create a New SendMessage
export const createSendMessage = async (
  data: SendMessageCreationAttributes,
): Promise<SendMessage> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_sendMessage = await SendMessage.create(data, { transaction })
    await transaction.commit()
    return kt_sendMessage
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Live Session
// export const getLiveSession = async (
//   options: FindOptions<SendMessage>,
// ): Promise<SendMessage | null> => {
//   try {
//     const kt_sendMessage = await SendMessage.findOne(options)
//     return kt_sendMessage
//   } catch (error) {
//     throw error
//   }
// }

// export const updateLiveSession = async (
//   options: UpdateOptions<SendMessageAttributes>,
//   data: Partial<SendMessage>,
// ): Promise<[affectedCount: number, affectedRows: SendMessage[]]> => {
//   const transaction = await dbClient.transaction()
//   try {
//     let updatedData: any = await SendMessage.update(data, {
//       ...options,
//       transaction,
//       returning: true,
//     })

//     await transaction.commit()
//     return updatedData[1]
//   } catch (error) {
//     await transaction.rollback()
//     throw error
//   }
// }

// Get All Live Session
export const getAllSendMessage = async (
  options: FindOptions<SendMessage>,
): Promise<SendMessage[] | []> => {
  const message = await SendMessage.findAll(options)
  return message
}

// delete Live Session
// export const deleteLiveSession = async (
//   options: DestroyOptions<SendMessage>,
// ): Promise<number> => {
//   const transaction = await dbClient.transaction()
//   try {
//     let deletedCnt = await SendMessage.destroy(options)
//     await transaction.commit()
//     return deletedCnt
//   } catch (error) {
//     await transaction.rollback()
//     throw error
//   }
// }

// Count Live Session
// export const countLiveSession = async (
//   options: FindOptions<SendMessage>,
// ): Promise<SendMessage | number> => {
//   const liveSessoin = await SendMessage.count(options)
//   return liveSessoin
// }
