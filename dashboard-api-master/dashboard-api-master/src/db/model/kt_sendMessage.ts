import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_sendMessageAttributes {
  sm_id: number
  sm_msg: string
  sm_class: number
  sm_student: number[]
  sm_type: string
  sm_createdAt: string
}

export type kt_sendMessagePk = 'sm_id'
export type kt_sendMessageId = kt_sendMessage[kt_sendMessagePk]
export type kt_sendMessageOptionalAttributes = 'sm_createdAt'
export type kt_sendMessageCreationAttributes = Optional<
  kt_sendMessageAttributes,
  kt_sendMessageOptionalAttributes
>

export class kt_sendMessage
  extends Model<kt_sendMessageAttributes, kt_sendMessageCreationAttributes>
  implements kt_sendMessageAttributes
{
  sm_id!: number
  sm_msg!: string
  sm_class!: number
  sm_student!: number[]
  sm_type!: string
  sm_createdAt!: string

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_sendMessage {
    return kt_sendMessage.init(
      {
        sm_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        sm_msg: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sm_class: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        sm_student: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true,
        },
        sm_type: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        sm_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_sendMessage',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_sendMessage_pkey',
            unique: true,
            fields: [{ name: 'sm_id' }],
          },
        ],
      },
    )
  }
}
