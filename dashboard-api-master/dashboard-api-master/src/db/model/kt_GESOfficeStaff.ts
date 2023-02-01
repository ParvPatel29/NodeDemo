import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_GESOffice, kt_GESOfficeId } from './kt_GESOffice'

export interface kt_GESOfficeStaffAttributes {
  gs_id: number
  gs_staffRole: string
  gs_email: string
  gs_gesOfficeId: number
  gs_fullName: string
  gs_phoneNumber: string
  gs_altPhoneNumber?: string
  gs_status?: boolean
  gs_password?: string
  gs_createdAt?: string
  gs_staffId: number
}

export type kt_GESOfficeStaffPk = 'gs_id'
export type kt_GESOfficeStaffId = kt_GESOfficeStaff[kt_GESOfficeStaffPk]
export type kt_GESOfficeStaffOptionalAttributes =
  | 'gs_altPhoneNumber'
  | 'gs_status'
  | 'gs_password'
  | 'gs_createdAt'
export type kt_GESOfficeStaffCreationAttributes = Optional<
  kt_GESOfficeStaffAttributes,
  kt_GESOfficeStaffOptionalAttributes
>

export class kt_GESOfficeStaff
  extends Model<
    kt_GESOfficeStaffAttributes,
    kt_GESOfficeStaffCreationAttributes
  >
  implements kt_GESOfficeStaffAttributes
{
  gs_id!: number
  gs_staffRole!: string
  gs_email!: string
  gs_gesOfficeId!: number
  gs_fullName!: string
  gs_phoneNumber!: string
  gs_altPhoneNumber?: string
  gs_status?: boolean
  gs_password?: string
  gs_createdAt?: string
  gs_staffId!: number

  // kt_GESOfficeStaff belongsTo kt_GESOffice via gs_gesOfficeId
  gs_gesOffice!: kt_GESOffice
  getGs_gesOffice!: Sequelize.BelongsToGetAssociationMixin<kt_GESOffice>
  setGs_gesOffice!: Sequelize.BelongsToSetAssociationMixin<
    kt_GESOffice,
    kt_GESOfficeId
  >
  createGs_gesOffice!: Sequelize.BelongsToCreateAssociationMixin<kt_GESOffice>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_GESOfficeStaff {
    return kt_GESOfficeStaff.init(
      {
        gs_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        gs_staffRole: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        gs_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_GESOfficeStaff_gs_email_key',
        },
        gs_gesOfficeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_GESOffice',
            key: 'go_id',
          },
        },
        gs_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        gs_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_GESOfficeStaff_gs_phoneNumber_key',
        },
        gs_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_GESOfficeStaff_gs_altPhoneNumber_key',
        },
        gs_status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        },
        gs_password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        gs_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        gs_staffId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_GESOfficeStaff',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_GESOfficeStaff_gs_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'gs_altPhoneNumber' }],
          },
          {
            name: 'kt_GESOfficeStaff_gs_email_key',
            unique: true,
            fields: [{ name: 'gs_email' }],
          },
          {
            name: 'kt_GESOfficeStaff_gs_phoneNumber_key',
            unique: true,
            fields: [{ name: 'gs_phoneNumber' }],
          },
          {
            name: 'kt_GESOfficeStaff_pkey',
            unique: true,
            fields: [{ name: 'gs_id' }],
          },
        ],
      },
    )
  }
}
