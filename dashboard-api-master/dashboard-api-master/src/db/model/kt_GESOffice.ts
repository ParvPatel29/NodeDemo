import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_GESMember, kt_GESMemberId } from './kt_GESMember'
import type {
  kt_GESOfficeStaff,
  kt_GESOfficeStaffId,
} from './kt_GESOfficeStaff'

export interface kt_GESOfficeAttributes {
  go_id: number
  go_officeLevel?: string
  go_officeTitle?: string
  go_region: string
  go_district?: string
  go_circuit?: string
  go_email: string
  go_phoneNumber: string
  go_altPhoneNumber?: string
  go_address?: string
  go_status: boolean
  go_createdAt: Date
  go_town?: string
  go_latitude?: string
  go_longitude?: string
  go_directorName?: string
  go_circuitHeadName?: string
  go_description?: string
  go_countryCode?: number
}

export type kt_GESOfficePk = 'go_id'
export type kt_GESOfficeId = kt_GESOffice[kt_GESOfficePk]
export type kt_GESOfficeOptionalAttributes =
  | 'go_id'
  | 'go_officeLevel'
  | 'go_officeTitle'
  | 'go_district'
  | 'go_circuit'
  | 'go_altPhoneNumber'
  | 'go_address'
  | 'go_status'
  | 'go_createdAt'
  | 'go_town'
  | 'go_latitude'
  | 'go_longitude'
  | 'go_directorName'
  | 'go_circuitHeadName'
  | 'go_description'
  | 'go_countryCode'
export type kt_GESOfficeCreationAttributes = Optional<
  kt_GESOfficeAttributes,
  kt_GESOfficeOptionalAttributes
>

export class kt_GESOffice
  extends Model<kt_GESOfficeAttributes, kt_GESOfficeCreationAttributes>
  implements kt_GESOfficeAttributes
{
  go_id!: number
  go_officeLevel?: string
  go_officeTitle?: string
  go_region!: string
  go_district?: string
  go_circuit?: string
  go_email!: string
  go_phoneNumber!: string
  go_altPhoneNumber?: string
  go_address?: string
  go_status!: boolean
  go_createdAt!: Date
  go_town?: string
  go_latitude?: string
  go_longitude?: string
  go_directorName?: string
  go_circuitHeadName?: string
  go_description?: string
  go_countryCode?: number

  // kt_GESOffice hasMany kt_GESMember via gm_gesOfficeId
  kt_GESMembers!: kt_GESMember[]
  getKt_GESMembers!: Sequelize.HasManyGetAssociationsMixin<kt_GESMember>
  setKt_GESMembers!: Sequelize.HasManySetAssociationsMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  addKt_GESMember!: Sequelize.HasManyAddAssociationMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  addKt_GESMembers!: Sequelize.HasManyAddAssociationsMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  createKt_GESMember!: Sequelize.HasManyCreateAssociationMixin<kt_GESMember>
  removeKt_GESMember!: Sequelize.HasManyRemoveAssociationMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  removeKt_GESMembers!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  hasKt_GESMember!: Sequelize.HasManyHasAssociationMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  hasKt_GESMembers!: Sequelize.HasManyHasAssociationsMixin<
    kt_GESMember,
    kt_GESMemberId
  >
  countKt_GESMembers!: Sequelize.HasManyCountAssociationsMixin
  // kt_GESOffice hasMany kt_GESOfficeStaff via gs_gesOfficeId
  kt_GESOfficeStaffs!: kt_GESOfficeStaff[]
  getKt_GESOfficeStaffs!: Sequelize.HasManyGetAssociationsMixin<kt_GESOfficeStaff>
  setKt_GESOfficeStaffs!: Sequelize.HasManySetAssociationsMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  addKt_GESOfficeStaff!: Sequelize.HasManyAddAssociationMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  addKt_GESOfficeStaffs!: Sequelize.HasManyAddAssociationsMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  createKt_GESOfficeStaff!: Sequelize.HasManyCreateAssociationMixin<kt_GESOfficeStaff>
  removeKt_GESOfficeStaff!: Sequelize.HasManyRemoveAssociationMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  removeKt_GESOfficeStaffs!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  hasKt_GESOfficeStaff!: Sequelize.HasManyHasAssociationMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  hasKt_GESOfficeStaffs!: Sequelize.HasManyHasAssociationsMixin<
    kt_GESOfficeStaff,
    kt_GESOfficeStaffId
  >
  countKt_GESOfficeStaffs!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_GESOffice {
    return kt_GESOffice.init(
      {
        go_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        go_officeLevel: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_officeTitle: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_region: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        go_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_GESOffice_go_email_key',
        },
        go_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_GESOffice_go_phoneNumber_key',
        },
        go_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_GESOffice_go_altPhoneNumber_key',
        },
        go_address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        go_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        go_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        go_town: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_latitude: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_longitude: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_directorName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_circuitHeadName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        go_countryCode: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_GESOffice',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_GESOffice_go_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'go_altPhoneNumber' }],
          },
          {
            name: 'kt_GESOffice_go_email_key',
            unique: true,
            fields: [{ name: 'go_email' }],
          },
          {
            name: 'kt_GESOffice_go_phoneNumber_key',
            unique: true,
            fields: [{ name: 'go_phoneNumber' }],
          },
          {
            name: 'kt_GESOffice_pkey',
            unique: true,
            fields: [{ name: 'go_id' }],
          },
        ],
      },
    )
  }
}
