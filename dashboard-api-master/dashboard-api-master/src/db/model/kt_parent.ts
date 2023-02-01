import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_parentAttributes {
  pt_id: number
  pt_fullName : string
  pt_password: string
  pt_email : string
  pt_education?: string
  pt_region?: string
  pt_district?: string
  pt_circuit?: string
  pt_phoneNumber: string
  pt_altPhoneNumber?: string
  pt_address?: string
  pt_profilePic?: string
  pt_degreeCertificate?: string
  pt_status: boolean
  pt_createdAt: Date
}

export type kt_parentPk = 'pt_id'
export type kt_parentId =
  kt_parent[kt_parentPk]
export type kt_parentOptionalAttributes =
  | 'pt_education'
  | 'pt_region'
  | 'pt_district'
  | 'pt_circuit'
  | 'pt_altPhoneNumber'
  | 'pt_address'
  | 'pt_profilePic'
  | 'pt_degreeCertificate'
  | 'pt_status'
  | 'pt_createdAt'
export type kt_parentCreationAttributes = Optional<
  kt_parentAttributes,
  kt_parentOptionalAttributes
>

export class kt_parent
  extends Model<
    kt_parentAttributes,
    kt_parentCreationAttributes
  >
  implements kt_parentAttributes
{
  pt_id!: number
  pt_fullName !: string
  pt_password!: string
  pt_email !: string
  pt_education?: string
  pt_region?: string
  pt_district?: string
  pt_circuit?: string
  pt_phoneNumber!: string
  pt_altPhoneNumber?: string
  pt_address?: string
  pt_profilePic?: string
  pt_degreeCertificate?: string
  pt_status!: boolean
  pt_createdAt!: Date

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_parent {
    return kt_parent.init(
      {
        pt_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        pt_fullName : {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pt_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pt_email : {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_parent_pt_email_key',
        },
        pt_education: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_region: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_parent_pt_phoneNumber_key',
        },
        pt_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_parent_pt_altPhoneNumber_key',
        },
        pt_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_profilePic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_degreeCertificate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pt_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        pt_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_parent',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_parent_pt_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'pt_altPhoneNumber' }],
          },
          {
            name: 'kt_parent_pt_email_key',
            unique: true,
            fields: [{ name: 'pt_email ' }],
          },
          {
            name: 'kt_parent_pt_phoneNumber_key',
            unique: true,
            fields: [{ name: 'pt_phoneNumber' }],
          },
          {
            name: 'kt_parent_pkey',
            unique: true,
            fields: [{ name: 'pt_id' }],
          },
        ],
      },
    )
  }
}
