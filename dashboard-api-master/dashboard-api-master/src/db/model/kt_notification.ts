import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_notificationAttributes {
  nt_id: number
  nt_schoolId: number
  nt_class: string
  nt_title: string
  nt_desc: string
  nt_file: string
  nt_status: boolean
  nt_createdAt: Date
}

export type kt_notificationPk = 'nt_id'
export type kt_notificationId = kt_notification[kt_notificationPk]
export type kt_notificationOptionalAttributes = 'nt_status' | 'nt_createdAt'
export type kt_notificationCreationAttributes = Optional<
  kt_notificationAttributes,
  kt_notificationOptionalAttributes
>

export class kt_notification
  extends Model<kt_notificationAttributes, kt_notificationCreationAttributes>
  implements kt_notificationAttributes
{
  nt_id!: number
  nt_schoolId!: number
  nt_class!: string
  nt_title!: string
  nt_desc!: string
  nt_file!: string
  nt_status!: boolean
  nt_createdAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_notification {
    return kt_notification.init(
      {
        nt_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nt_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nt_class: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nt_title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nt_desc: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nt_file: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        nt_status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        },
        nt_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_notification',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_notification_pkey',
            unique: true,
            fields: [{ name: 'nt_id' }],
          },
        ],
      },
    )
  }
}
