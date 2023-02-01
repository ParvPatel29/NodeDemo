import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_authAttributes {
  kn_id: number
  kn_token: string
  kn_userId: number
  kn_createdAt: Date
  kn_type: string
}

export type kt_authPk = 'kn_id'
export type kt_authId = kt_auth[kt_authPk]
export type kt_authOptionalAttributes = 'kn_id' | 'kn_createdAt'
export type kt_authCreationAttributes = Optional<
  kt_authAttributes,
  kt_authOptionalAttributes
>

export class kt_auth
  extends Model<kt_authAttributes, kt_authCreationAttributes>
  implements kt_authAttributes
{
  kn_id!: number
  kn_token!: string
  kn_userId!: number
  kn_createdAt!: Date
  kn_type!: string

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_auth {
    return kt_auth.init(
      {
        kn_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        kn_token: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        kn_userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kn_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        kn_type: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_auth',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_auth_pkey',
            unique: true,
            fields: [{ name: 'kn_id' }],
          },
        ],
      },
    )
  }
}
