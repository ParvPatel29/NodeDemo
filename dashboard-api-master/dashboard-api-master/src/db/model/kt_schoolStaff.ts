import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_school, kt_schoolId } from './kt_school'

export interface kt_schoolStaffAttributes {
  ss_id: number
  ss_staffRole: string
  ss_email: string
  ss_schoolId: number
  ss_staffId: number
  ss_fullName: string
  ss_phoneNumber: string
  ss_altPhoneNumber?: string
  ss_status: boolean
  ss_password?: string
  ss_createdAt: Date
}

export type kt_schoolStaffPk = 'ss_id'
export type kt_schoolStaffId = kt_schoolStaff[kt_schoolStaffPk]
export type kt_schoolStaffOptionalAttributes =
  | 'ss_altPhoneNumber'
  | 'ss_status'
  | 'ss_password'
  | 'ss_createdAt'
export type kt_schoolStaffCreationAttributes = Optional<
  kt_schoolStaffAttributes,
  kt_schoolStaffOptionalAttributes
>

export class kt_schoolStaff
  extends Model<kt_schoolStaffAttributes, kt_schoolStaffCreationAttributes>
  implements kt_schoolStaffAttributes
{
  ss_id!: number
  ss_staffRole!: string
  ss_email!: string
  ss_schoolId!: number
  ss_staffId!: number
  ss_fullName!: string
  ss_phoneNumber!: string
  ss_altPhoneNumber?: string
  ss_status!: boolean
  ss_password?: string
  ss_createdAt!: Date

  // kt_schoolStaff belongsTo kt_school via ss_schoolId
  ss_school!: kt_school
  getSs_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setSs_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createSs_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_schoolStaff {
    return kt_schoolStaff.init(
      {
        ss_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ss_staffRole: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        ss_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_schoolStaff_ss_email_key',
        },
        ss_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        ss_staffId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: 'kt_schoolStaff_ss_staffId_key',
        },
        ss_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ss_phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: 'kt_schoolStaff_ss_phoneNumber_key',
        },
        ss_altPhoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: true,
          unique: 'kt_schoolStaff_ss_altPhoneNumber_key',
        },
        ss_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        ss_password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ss_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_schoolStaff',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_schoolStaff_pkey',
            unique: true,
            fields: [{ name: 'ss_id' }],
          },
          {
            name: 'kt_schoolStaff_ss_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'ss_altPhoneNumber' }],
          },
          {
            name: 'kt_schoolStaff_ss_email_key',
            unique: true,
            fields: [{ name: 'ss_email' }],
          },
          {
            name: 'kt_schoolStaff_ss_phoneNumber_key',
            unique: true,
            fields: [{ name: 'ss_phoneNumber' }],
          },
          {
            name: 'kt_schoolStaff_ss_staffId_key',
            unique: true,
            fields: [{ name: 'ss_staffId' }],
          },
        ],
      },
    )
  }
}
