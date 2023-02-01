import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_teamMemberAttributes {
  tm_id: number
  tm_role: string
  tm_email: string
  tm_fullName: string
  tm_phoneNumber: string
  tm_altPhoneNumber?: string
  tm_password: string
  tm_status: boolean
  tm_createdAt: Date
}

export type kt_teamMemberPk = 'tm_id'
export type kt_teamMemberId = kt_teamMember[kt_teamMemberPk]
export type kt_teamMemberOptionalAttributes =
  | 'tm_altPhoneNumber'
  | 'tm_status'
  | 'tm_createdAt'
export type kt_teamMemberCreationAttributes = Optional<
  kt_teamMemberAttributes,
  kt_teamMemberOptionalAttributes
>

export class kt_teamMember
  extends Model<kt_teamMemberAttributes, kt_teamMemberCreationAttributes>
  implements kt_teamMemberAttributes
{
  tm_id!: number
  tm_role!: string
  tm_email!: string
  tm_fullName!: string
  tm_phoneNumber!: string
  tm_altPhoneNumber?: string
  tm_password!: string
  tm_status!: boolean
  tm_createdAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_teamMember {
    return kt_teamMember.init(
      {
        tm_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tm_role: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tm_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_teamMember_tm_email_key',
        },
        tm_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tm_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_teamMember_tm_phoneNumber_key',
        },
        tm_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_teamMember_tm_altPhoneNumber_key',
        },
        tm_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tm_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        tm_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_teamMember',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_teamMember_pkey',
            unique: true,
            fields: [{ name: 'tm_id' }],
          },
          {
            name: 'kt_teamMember_tm_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'tm_altPhoneNumber' }],
          },
          {
            name: 'kt_teamMember_tm_email_key',
            unique: true,
            fields: [{ name: 'tm_email' }],
          },
          {
            name: 'kt_teamMember_tm_phoneNumber_key',
            unique: true,
            fields: [{ name: 'tm_phoneNumber' }],
          },
        ],
      },
    )
  }
}
