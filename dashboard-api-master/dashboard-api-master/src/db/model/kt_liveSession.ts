import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_liveSessionAttributes {
  ls_id: number
  tc_id: number
  ls_title: string
  ls_image: string
  ls_date: Date
  ls_time: string
  ls_desc: string
  ls_roomURL: string
  ls_mainCategory: string
  ls_category: string
  ls_subCategory: string
  ls_topic: string
  ls_createdAt: string
  ls_status: boolean
}

export type kt_liveSessionPk = 'ls_id'
export type kt_liveSessionId = kt_liveSession[kt_liveSessionPk]
export type kt_liveSessionOptionalAttributes = 'ls_createdAt' | 'ls_status'
export type kt_liveSessionCreationAttributes = Optional<
  kt_liveSessionAttributes,
  kt_liveSessionOptionalAttributes
>

export class kt_liveSession
  extends Model<kt_liveSessionAttributes, kt_liveSessionCreationAttributes>
  implements kt_liveSessionAttributes
{
  ls_id!: number
  tc_id!: number
  ls_title!: string
  ls_image!: string
  ls_date!: Date
  ls_time!: string
  ls_desc!: string
  ls_roomURL!: string
  ls_mainCategory!: string
  ls_category!: string
  ls_subCategory!: string
  ls_topic!: string
  ls_createdAt!: string
  ls_status!: boolean

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_liveSession {
    return kt_liveSession.init(
      {
        ls_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tc_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ls_title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ls_image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        ls_time: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_desc: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_roomURL: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_mainCategory: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_category: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_subCategory: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_topic: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ls_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        ls_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_liveSession',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_liveSession_pkey',
            unique: true,
            fields: [{ name: 'ls_id' }],
          },
        ],
      },
    )
  }
}
