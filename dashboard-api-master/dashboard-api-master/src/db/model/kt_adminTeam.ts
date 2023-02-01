import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_adminTeamAttributes {
  at_id: number
  at_role: string
  at_email: string
  at_fullName: string
  at_phoneNumber: string
  at_altPhoneNumber?: string
  at_password: string
  at_status: boolean
  at_createdAt: Date
}

export type kt_adminTeamPk = 'at_id'
export type kt_adminTeamId = kt_adminTeam[kt_adminTeamPk]
export type kt_adminTeamOptionalAttributes =
  | 'at_altPhoneNumber'
  | 'at_status'
  | 'at_createdAt'
export type kt_adminTeamCreationAttributes = Optional<
  kt_adminTeamAttributes,
  kt_adminTeamOptionalAttributes
>

export class kt_adminTeam
  extends Model<kt_adminTeamAttributes, kt_adminTeamCreationAttributes>
  implements kt_adminTeamAttributes
{
  at_id!: number
  at_role!: string
  at_email!: string
  at_fullName!: string
  at_phoneNumber!: string
  at_altPhoneNumber?: string
  at_password!: string
  at_status!: boolean
  at_createdAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_adminTeam {
    return kt_adminTeam.init(
      {
        at_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        at_role: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        at_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_adminTeam_at_email_key',
        },
        at_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        at_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_adminTeam_at_phoneNumber_key',
        },
        at_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_adminTeam_at_altPhoneNumber_key',
        },
        at_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        at_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        at_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_adminTeam',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_adminTeam_at_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'at_altPhoneNumber' }],
          },
          {
            name: 'kt_adminTeam_at_email_key',
            unique: true,
            fields: [{ name: 'at_email' }],
          },
          {
            name: 'kt_adminTeam_at_phoneNumber_key',
            unique: true,
            fields: [{ name: 'at_phoneNumber' }],
          },
          {
            name: 'kt_adminTeam_pkey',
            unique: true,
            fields: [{ name: 'at_id' }],
          },
        ],
      },
    )
  }
}
