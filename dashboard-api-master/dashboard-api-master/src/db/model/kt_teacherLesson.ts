import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_school, kt_schoolId } from './kt_school'
import type { kt_teacher, kt_teacherId } from './kt_teacher'

export interface kt_teacherLessonAttributes {
  tl_id: number
  tl_schoolId: number
  tl_teacherId: number
  tl_lesson: string
  tl_subject: string
  tl_createdAt: Date
}

export type kt_teacherLessonPk = 'tl_id'
export type kt_teacherLessonId = kt_teacherLesson[kt_teacherLessonPk]
export type kt_teacherLessonOptionalAttributes = 'tl_createdAt'
export type kt_teacherLessonCreationAttributes = Optional<
  kt_teacherLessonAttributes,
  kt_teacherLessonOptionalAttributes
>

export class kt_teacherLesson
  extends Model<kt_teacherLessonAttributes, kt_teacherLessonCreationAttributes>
  implements kt_teacherLessonAttributes
{
  tl_id!: number
  tl_schoolId!: number
  tl_teacherId!: number
  tl_lesson!: string
  tl_subject!: string
  tl_createdAt!: Date

  // kt_teacherLesson belongsTo kt_school via tl_schoolId
  tl_school!: kt_school
  getTl_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setTl_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createTl_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>
  // kt_teacherLesson belongsTo kt_teacher via tl_teacherId
  tl_teacher!: kt_teacher
  getTl_teacher!: Sequelize.BelongsToGetAssociationMixin<kt_teacher>
  setTl_teacher!: Sequelize.BelongsToSetAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  createTl_teacher!: Sequelize.BelongsToCreateAssociationMixin<kt_teacher>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_teacherLesson {
    return kt_teacherLesson.init(
      {
        tl_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tl_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        tl_teacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_teacher',
            key: 'tc_id',
          },
        },
        tl_lesson: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tl_subject: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tl_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_teacherLesson',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_teacherLesson_pkey',
            unique: true,
            fields: [{ name: 'tl_id' }],
          },
        ],
      },
    )
  }
}
