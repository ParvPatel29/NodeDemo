import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_school, kt_schoolId } from './kt_school'

export interface kt_weeklyLessonPlanAttributes {
  wlp_id: number
  sc_id: number
  tc_id: number
  wlp_weekNumber?: number
  wlp_classId?: string
  wlp_subject?: string
  wlp_learningIndicator?: number
  wlp_performanceIndicator?: number
  wlp_weekEnding?: number
  wlp_reference?: string
  wlp_teachingMaterial?: string
  mon?: Object
  tue?: Object
  wed?: Object
  thu?: Object
  fri?: Object
  sat?: Object
  wlp_status?: boolean
  wlp_createdAt?: Date
}

export type kt_weeklyLessonPlanPk = 'wlp_id'
export type kt_weeklyLessonPlanId = kt_weeklyLessonPlan[kt_weeklyLessonPlanPk]
export type kt_weeklyLessonPlanOptionalAttributes =
  | 'wlp_classId'
  | 'wlp_subject'
  | 'wlp_weekNumber'
  | 'wlp_learningIndicator'
  | 'wlp_reference'
  | 'wlp_teachingMaterial'
  | 'wlp_weekEnding'
  | 'wlp_performanceIndicator'
export type kt_weeklyLessonPlanCreationAttributes = Optional<
  kt_weeklyLessonPlanAttributes,
  kt_weeklyLessonPlanOptionalAttributes
>

export class kt_weeklyLessonPlan
  extends Model<kt_weeklyLessonPlanAttributes, kt_weeklyLessonPlanCreationAttributes>
  implements kt_weeklyLessonPlanAttributes
{
  wlp_id!: number
  sc_id!: number
  tc_id!: number
  wlp_classId?: string
  wlp_subject?: string
  wlp_weekNumber?: number
  wlp_learningIndicator?: number
  wlp_reference?: string
  wlp_teachingMaterial?: string
  wlp_weekEnding?: number
  wlp_performanceIndicator?: number
  mon!: Object
  tue!: Object
  wed!: Object
  thu!: Object
  fri!: Object
  sat!: Object
  wlp_createdAt?: Date
  wlp_status?: boolean

  wlp_school!: kt_school
  getWlp_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setWlp_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createWlp_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_weeklyLessonPlan {
    return kt_weeklyLessonPlan.init(
      {
        wlp_id: {
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
        wlp_classId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        wlp_subject: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        wlp_weekNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        wlp_learningIndicator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        wlp_reference: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        wlp_teachingMaterial: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        wlp_weekEnding: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        wlp_performanceIndicator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        mon: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        tue: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        wed: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        thu: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        fri: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        sat: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        wlp_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        wlp_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_weeklyLessonPlan',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_weeklyLessonPlan_pkey',
            unique: true,
            fields: [{ name: 'wlp_id' }],
          },
        ],
      },
    )
  }
}
