import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_contentCategoryAttributes {
  cc_id: number
  cc_categoryName: string
  cc_parentId?: number
  cc_status: boolean
  cc_categoryTag: string
  cc_categoryType: number
}

export type kt_contentCategoryPk = 'cc_id'
export type kt_contentCategoryId = kt_contentCategory[kt_contentCategoryPk]
export type kt_contentCategoryOptionalAttributes = 'cc_parentId' | 'cc_status'
export type kt_contentCategoryCreationAttributes = Optional<
  kt_contentCategoryAttributes,
  kt_contentCategoryOptionalAttributes
>

export class kt_contentCategory
  extends Model<
    kt_contentCategoryAttributes,
    kt_contentCategoryCreationAttributes
  >
  implements kt_contentCategoryAttributes
{
  cc_id!: number
  cc_categoryName!: string
  cc_parentId?: number
  cc_status!: boolean
  cc_categoryTag!: string
  cc_categoryType!: number

  // kt_contentCategory belongsTo kt_contentCategory via cc_parentId
  cc_parent!: kt_contentCategory
  getCc_parent!: Sequelize.BelongsToGetAssociationMixin<kt_contentCategory>
  setCc_parent!: Sequelize.BelongsToSetAssociationMixin<
    kt_contentCategory,
    kt_contentCategoryId
  >
  createCc_parent!: Sequelize.BelongsToCreateAssociationMixin<kt_contentCategory>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_contentCategory {
    return kt_contentCategory.init(
      {
        cc_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cc_categoryName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cc_parentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'kt_contentCategory',
            key: 'cc_id',
          },
        },
        cc_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        cc_categoryTag: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cc_categoryType: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_contentCategory',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_contentCategory_pkey',
            unique: true,
            fields: [{ name: 'cc_id' }],
          },
        ],
      },
    )
  }
}
