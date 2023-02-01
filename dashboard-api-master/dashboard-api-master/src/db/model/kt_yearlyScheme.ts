import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_school, kt_schoolId } from './kt_school'

export interface kt_yearlySchemeAttributes {
  ysc_id: number
  sc_id: number
  tc_id: number
  ysc_year: number
  ysc_date?: Date
  ysc_classId?: string
  ysc_subject?: string
  ysc_weekNumber?: number
  term1_subStrand?: string
  term2_subStrand?: string
  term3_subStrand?: string
  ysc_createdAt?: Date
  ysc_status?: boolean
}

export type kt_yearlySchemePk = 'ysc_id'
export type kt_yearlySchemeId = kt_yearlyScheme[kt_yearlySchemePk]
export type kt_yearlySchemeOptionalAttributes =
  | 'ysc_date'
  | 'ysc_classId'
  | 'ysc_subject'
  | 'ysc_weekNumber'
  | 'term1_subStrand'
  | 'term2_subStrand'
  | 'term3_subStrand'
export type kt_yearlySchemeCreationAttributes = Optional<
  kt_yearlySchemeAttributes,
  kt_yearlySchemeOptionalAttributes
>

export class kt_yearlyScheme
  extends Model<kt_yearlySchemeAttributes, kt_yearlySchemeCreationAttributes>
  implements kt_yearlySchemeAttributes
{
  ysc_id!: number
  sc_id!: number
  tc_id!: number
  ysc_year!: number
  ysc_date?: Date
  ysc_classId?: string
  ysc_subject?: string
  ysc_weekNumber?: number
  term1_subStrand?: string
  term2_subStrand?: string
  term3_subStrand?: string
  ysc_createdAt?: Date
  ysc_status?: boolean

  // kt_yearlyScheme belongsTo kt_school via ysc_schoolId
  ysc_school!: kt_school
  getYsc_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setYsc_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createYsc_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_yearlyScheme {
    return kt_yearlyScheme.init(
      {
        ysc_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        sc_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tc_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ysc_year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        ysc_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ysc_classId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ysc_subject: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ysc_weekNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        term1_subStrand: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        term2_subStrand: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        term3_subStrand: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ysc_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        ysc_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_yearlyScheme',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_yearlyScheme_pkey',
            unique: true,
            fields: [{ name: 'ysc_id' }],
          },
        ],
      },
    )
  }
}
