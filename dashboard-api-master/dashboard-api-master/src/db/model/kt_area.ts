import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_areaAttributes {
  ar_id: number
  ar_title: string
  ar_type: string
  ar_parentId?: number
  ar_status: boolean
}

export type kt_areaPk = 'ar_id'
export type kt_areaId = kt_area[kt_areaPk]
export type kt_areaOptionalAttributes = 'ar_parentId' | 'ar_status'
export type kt_areaCreationAttributes = Optional<
  kt_areaAttributes,
  kt_areaOptionalAttributes
>

export class kt_area
  extends Model<kt_areaAttributes, kt_areaCreationAttributes>
  implements kt_areaAttributes
{
  ar_id!: number
  ar_title!: string
  ar_type!: string
  ar_parentId?: number
  ar_status!: boolean

  // kt_area belongsTo kt_area via ar_parentId
  ar_parent!: kt_area
  getAr_parent!: Sequelize.BelongsToGetAssociationMixin<kt_area>
  setAr_parent!: Sequelize.BelongsToSetAssociationMixin<kt_area, kt_areaId>
  createAr_parent!: Sequelize.BelongsToCreateAssociationMixin<kt_area>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_area {
    return kt_area.init(
      {
        ar_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ar_title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        ar_type: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        ar_parentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'kt_area',
            key: 'ar_id',
          },
        },
        ar_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_area',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_area_pkey',
            unique: true,
            fields: [{ name: 'ar_id' }],
          },
          {
            name: 'kt_parentId_ar_id',
            fields: [{ name: 'ar_parentId' }],
          },
        ],
      },
    )
  }
}
