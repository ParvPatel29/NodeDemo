import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_tutorManagementAttributes {
  tu_id: number
  tu_fullName: string
  tu_email: string
  tu_phoneNumber: string
  tu_region: string
  tu_district?: string
  tu_circuit?: string
  tu_createdAt: Date
  tu_status: boolean
}

export type kt_tutorManagementPk = 'tu_id'
export type kt_tutorManagementId = kt_tutorManagement[kt_tutorManagementPk]
export type kt_tutorManagementOptionalAttributes =
  | 'tu_district'
  | 'tu_circuit'
  | 'tu_createdAt'
  | 'tu_status'
export type kt_tutorManagementCreationAttributes = Optional<
  kt_tutorManagementAttributes,
  kt_tutorManagementOptionalAttributes
>

export class kt_tutorManagement
  extends Model<
    kt_tutorManagementAttributes,
    kt_tutorManagementCreationAttributes
  >
  implements kt_tutorManagementAttributes
{
  tu_id!: number
  tu_fullName!: string
  tu_email!: string
  tu_phoneNumber!: string
  tu_region!: string
  tu_district?: string
  tu_circuit?: string
  tu_createdAt!: Date
  tu_status!: boolean

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_tutorManagement {
    return kt_tutorManagement.init(
      {
        tu_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tu_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tu_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_tutorManagement_tu_email_key',
        },
        tu_phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: 'kt_tutorManagement_tu_phoneNumber_key',
        },
        tu_region: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        tu_district: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        tu_circuit: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        tu_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tu_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_tutorManagement',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_tutorManagement_pkey',
            unique: true,
            fields: [{ name: 'tu_id' }],
          },
          {
            name: 'kt_tutorManagement_tu_email_key',
            unique: true,
            fields: [{ name: 'tu_email' }],
          },
          {
            name: 'kt_tutorManagement_tu_phoneNumber_key',
            unique: true,
            fields: [{ name: 'tu_phoneNumber' }],
          },
          {
            name: 'kt_tutor_tu_email_key',
            unique: true,
            fields: [{ name: 'tu_email' }],
          },
          {
            name: 'kt_tutor_tu_phoneNumber_key',
            unique: true,
            fields: [{ name: 'tu_phoneNumber' }],
          },
        ],
      },
    )
  }
}
