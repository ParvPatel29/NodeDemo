import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_school, kt_schoolId } from './kt_school'

export interface kt_termlySchemeAttributes {
  tsc_id: number
  sc_id: number
  tc_id: number
  tsc_year: number
  tsc_termNumber?: number
  tsc_date?: Date
  tsc_classId?: string
  tsc_subject?: string
  tsc_weekNumber?: number
  tsc_strand?: string
  tsc_subStrand?: string
  tsc_contentStandards?: string
  tsc_indicators?: string
  tsc_resources?: string
  tsc_createdAt?:Date
  tsc_status?:boolean
}

export type kt_termlySchemePk = 'tsc_id'
export type kt_termlySchemeId = kt_termlyScheme[kt_termlySchemePk]
export type kt_termlySchemeOptionalAttributes =
  | 'tsc_date'
  | 'tsc_classId'
  | 'tsc_subject'
  | 'tsc_weekNumber'
  | 'tsc_strand'
  | 'tsc_subStrand'
  | 'tsc_contentStandards'
  | 'tsc_indicators'
  | 'tsc_resources'
export type kt_termlySchemeCreationAttributes = Optional<
  kt_termlySchemeAttributes,
  kt_termlySchemeOptionalAttributes
>

export class kt_termlyScheme
  extends Model<kt_termlySchemeAttributes, kt_termlySchemeCreationAttributes>
  implements kt_termlySchemeAttributes
{
  tsc_id!: number
  sc_id!: number
  tc_id!: number
  tsc_year!: number
  tsc_termNumber!:number
  tsc_date?: Date
  tsc_classId?: string
  tsc_subject?: string
  tsc_weekNumber?: number
  tsc_strand!: string
  tsc_subStrand?: string
  tsc_contentStandards?: string
  tsc_indicators?:string
  tsc_resources?: string
  tsc_createdAt?:Date
  tsc_status?:boolean

 // kt_termlyScheme belongsTo kt_school via tsc_schoolId
 tsc_school!: kt_school
 getTsc_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
 setTsc_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
 createTsc_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_termlyScheme {
    return kt_termlyScheme.init(
      {
        tsc_id: {
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
        tsc_year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tsc_termNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tsc_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        tsc_classId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tsc_subject: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tsc_weekNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        tsc_strand: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tsc_subStrand: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tsc_contentStandards: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tsc_indicators: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tsc_resources: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tsc_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tsc_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_termlyScheme',
        schema: 'public',
        timestamps: false,
        indexes: [
          
          {
            name: 'kt_termlyScheme_pkey',
            unique: true,
            fields: [{ name: 'tsc_id' }],
          },
        ],
      },
    )
  }
}
