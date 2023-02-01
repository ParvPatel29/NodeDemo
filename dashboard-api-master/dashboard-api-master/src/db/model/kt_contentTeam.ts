import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_contentTeamAttributes {
  ct_id: number
  ct_fullName: string
  ct_email: string
  ct_education: string
  ct_profilePic: string
  ct_degreeCertificate: string
  ct_address: string
  ct_phoneNumber: string
  ct_altPhoneNumber?: string
  ct_password: string
  ct_status: boolean
  ct_createdAt: Date
}

export type kt_contentTeamPk = 'ct_id'
export type kt_contentTeamId = kt_contentTeam[kt_contentTeamPk]
export type kt_contentTeamOptionalAttributes =
  | 'ct_altPhoneNumber'
  | 'ct_status'
  | 'ct_createdAt'
export type kt_contentTeamCreationAttributes = Optional<
  kt_contentTeamAttributes,
  kt_contentTeamOptionalAttributes
>

export class kt_contentTeam
  extends Model<kt_contentTeamAttributes, kt_contentTeamCreationAttributes>
  implements kt_contentTeamAttributes
{
  ct_id!: number
  ct_fullName!: string
  ct_email!: string
  ct_education!: string
  ct_profilePic!: string
  ct_degreeCertificate!: string
  ct_address!: string
  ct_phoneNumber!: string
  ct_altPhoneNumber?: string
  ct_password!: string
  ct_status!: boolean
  ct_createdAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_contentTeam {
    return kt_contentTeam.init(
      {
        ct_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ct_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ct_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_contentTeam_ct_email_key',
        },
        ct_education: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ct_profilePic: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ct_degreeCertificate: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ct_address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        ct_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_contentTeam_ct_phoneNumber_key',
        },
        ct_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_contentTeam_ct_altPhoneNumber_key',
        },
        ct_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ct_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        ct_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_contentTeam',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_contentTeam_ct_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'ct_altPhoneNumber' }],
          },
          {
            name: 'kt_contentTeam_ct_email_key',
            unique: true,
            fields: [{ name: 'ct_email' }],
          },
          {
            name: 'kt_contentTeam_ct_phoneNumber_key',
            unique: true,
            fields: [{ name: 'ct_phoneNumber' }],
          },
          {
            name: 'kt_contentTeam_pkey',
            unique: true,
            fields: [{ name: 'ct_id' }],
          },
        ],
      },
    )
  }
}
