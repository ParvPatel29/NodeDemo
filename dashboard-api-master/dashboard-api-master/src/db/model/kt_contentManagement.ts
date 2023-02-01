import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_contentManagementAttributes {
  cm_id: number
  cm_contentTitle: string
  cm_readingMaterial: string
  cm_video: string
  cm_description: string
  cm_status: boolean
  cm_createdAt: Date
}

export type kt_contentManagementPk = 'cm_id'
export type kt_contentManagementId =
  kt_contentManagement[kt_contentManagementPk]
export type kt_contentManagementOptionalAttributes =
  | 'cm_status'
  | 'cm_createdAt'
export type kt_contentManagementCreationAttributes = Optional<
  kt_contentManagementAttributes,
  kt_contentManagementOptionalAttributes
>

export class kt_contentManagement
  extends Model<
    kt_contentManagementAttributes,
    kt_contentManagementCreationAttributes
  >
  implements kt_contentManagementAttributes
{
  cm_id!: number
  cm_contentTitle!: string
  cm_readingMaterial!: string
  cm_video!: string
  cm_description!: string
  cm_status!: boolean
  cm_createdAt!: Date

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_contentManagement {
    return kt_contentManagement.init(
      {
        cm_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cm_contentTitle: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cm_readingMaterial: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cm_video: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cm_description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        cm_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        cm_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_contentManagement',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_contentManagement_pkey',
            unique: true,
            fields: [{ name: 'cm_id' }],
          },
        ],
      },
    )
  }
}
