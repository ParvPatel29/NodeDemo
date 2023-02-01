import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_GESOffice, kt_GESOfficeId } from './kt_GESOffice'

export interface kt_GESMemberAttributes {
  gm_id: number
  gm_fullName: string
  gm_authorityType?: string
  gm_region?: string
  gm_district?: string
  gm_circuit?: string
  gm_designation: string
  gm_email: string
  gm_phoneNumber: string
  gm_altPhoneNumber?: string
  gm_status: boolean
  gm_password: string
  gm_createdAt: Date
  gm_gesOfficeId: number
}

export type kt_GESMemberPk = 'gm_id'
export type kt_GESMemberId = kt_GESMember[kt_GESMemberPk]
export type kt_GESMemberOptionalAttributes =
  | 'gm_authorityType'
  | 'gm_region'
  | 'gm_district'
  | 'gm_circuit'
  | 'gm_altPhoneNumber'
  | 'gm_status'
  | 'gm_createdAt'
export type kt_GESMemberCreationAttributes = Optional<
  kt_GESMemberAttributes,
  kt_GESMemberOptionalAttributes
>

export class kt_GESMember
  extends Model<kt_GESMemberAttributes, kt_GESMemberCreationAttributes>
  implements kt_GESMemberAttributes
{
  gm_id!: number
  gm_fullName!: string
  gm_authorityType?: string
  gm_region?: string
  gm_district?: string
  gm_circuit?: string
  gm_designation!: string
  gm_email!: string
  gm_phoneNumber!: string
  gm_altPhoneNumber?: string
  gm_status!: boolean
  gm_password!: string
  gm_createdAt!: Date
  gm_gesOfficeId!: number

  // kt_GESMember belongsTo kt_GESOffice via gm_gesOfficeId
  gm_gesOffice!: kt_GESOffice
  getGm_gesOffice!: Sequelize.BelongsToGetAssociationMixin<kt_GESOffice>
  setGm_gesOffice!: Sequelize.BelongsToSetAssociationMixin<
    kt_GESOffice,
    kt_GESOfficeId
  >
  createGm_gesOffice!: Sequelize.BelongsToCreateAssociationMixin<kt_GESOffice>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_GESMember {
    return kt_GESMember.init(
      {
        gm_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        gm_fullName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        gm_authorityType: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        gm_region: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        gm_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        gm_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        gm_designation: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        gm_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_GESMember_gm_email_key',
        },
        gm_phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: 'kt_GESMember_gm_phoneNumber_key',
        },
        gm_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_GESMember_gm_altPhoneNumber_key',
        },
        gm_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        gm_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        gm_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        gm_gesOfficeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_GESOffice',
            key: 'go_id',
          },
        },
      },
      {
        sequelize,
        tableName: 'kt_GESMember',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_GESMember_gm_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'gm_altPhoneNumber' }],
          },
          {
            name: 'kt_GESMember_gm_email_key',
            unique: true,
            fields: [{ name: 'gm_email' }],
          },
          {
            name: 'kt_GESMember_gm_phoneNumber_key',
            unique: true,
            fields: [{ name: 'gm_phoneNumber' }],
          },
          {
            name: 'kt_GESMember_pkey',
            unique: true,
            fields: [{ name: 'gm_id' }],
          },
        ],
      },
    )
  }
}
