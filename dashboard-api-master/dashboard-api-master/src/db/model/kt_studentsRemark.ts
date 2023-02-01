import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_school, kt_schoolId } from './kt_school'
import type { kt_student, kt_studentId } from './kt_student'
import type { kt_teacher, kt_teacherId } from './kt_teacher'

export interface kt_studentsRemarkAttributes {
  sr_studentId: number
  sr_teacherId: number
  sr_schoolId: number
  sr_remarks: string
  sr_createdAt: Date
  sr_id: number
}

export type kt_studentsRemarkPk = 'sr_id'
export type kt_studentsRemarkId = kt_studentsRemark[kt_studentsRemarkPk]
export type kt_studentsRemarkOptionalAttributes = 'sr_createdAt'
export type kt_studentsRemarkCreationAttributes = Optional<
  kt_studentsRemarkAttributes,
  kt_studentsRemarkOptionalAttributes
>

export class kt_studentsRemark
  extends Model<
    kt_studentsRemarkAttributes,
    kt_studentsRemarkCreationAttributes
  >
  implements kt_studentsRemarkAttributes
{
  sr_studentId!: number
  sr_teacherId!: number
  sr_schoolId!: number
  sr_remarks!: string
  sr_createdAt!: Date
  sr_id!: number

  // kt_studentsRemark belongsTo kt_school via sr_schoolId
  sr_school!: kt_school
  getSr_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setSr_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createSr_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>
  // kt_studentsRemark belongsTo kt_student via sr_studentId
  sr_student!: kt_student
  getSr_student!: Sequelize.BelongsToGetAssociationMixin<kt_student>
  setSr_student!: Sequelize.BelongsToSetAssociationMixin<
    kt_student,
    kt_studentId
  >
  createSr_student!: Sequelize.BelongsToCreateAssociationMixin<kt_student>
  // kt_studentsRemark belongsTo kt_teacher via sr_teacherId
  sr_teacher!: kt_teacher
  getSr_teacher!: Sequelize.BelongsToGetAssociationMixin<kt_teacher>
  setSr_teacher!: Sequelize.BelongsToSetAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  createSr_teacher!: Sequelize.BelongsToCreateAssociationMixin<kt_teacher>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_studentsRemark {
    return kt_studentsRemark.init(
      {
        sr_studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_student',
            key: 'st_id',
          },
        },
        sr_teacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_teacher',
            key: 'tc_id',
          },
        },
        sr_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        sr_remarks: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        sr_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        sr_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_studentsRemark',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_studentsRemark_pkey',
            unique: true,
            fields: [{ name: 'sr_id' }],
          },
        ],
      },
    )
  }
}
