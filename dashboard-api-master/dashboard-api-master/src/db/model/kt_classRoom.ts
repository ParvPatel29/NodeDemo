import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_examTimeTable, kt_examTimeTableId } from './kt_examTimeTable'
import type { kt_questionBank, kt_questionBankId } from './kt_questionBank'
import type { kt_school, kt_schoolId } from './kt_school'
import type { kt_student, kt_studentId } from './kt_student'
import type { kt_teacher, kt_teacherId } from './kt_teacher'

export interface kt_classRoomAttributes {
  cr_id: number
  cr_division: string
  cr_noOfStudents: number
  cr_classTeacherId: number
  cr_schoolId: number
  cr_status: boolean
  cr_createdAt: Date
  cr_class: string
}

export type kt_classRoomPk = 'cr_id'
export type kt_classRoomId = kt_classRoom[kt_classRoomPk]
export type kt_classRoomOptionalAttributes = 'cr_status' | 'cr_createdAt'
export type kt_classRoomCreationAttributes = Optional<
  kt_classRoomAttributes,
  kt_classRoomOptionalAttributes
>

export class kt_classRoom
  extends Model<kt_classRoomAttributes, kt_classRoomCreationAttributes>
  implements kt_classRoomAttributes
{
  cr_id!: number
  cr_division!: string
  cr_noOfStudents!: number
  cr_classTeacherId!: number
  cr_schoolId!: number
  cr_status!: boolean
  cr_createdAt!: Date
  cr_class!: string

  // kt_classRoom hasMany kt_examTimeTable via et_classId
  // kt_examTimeTables!: kt_examTimeTable[]
  // getKt_examTimeTables!: Sequelize.HasManyGetAssociationsMixin<kt_examTimeTable>
  // setKt_examTimeTables!: Sequelize.HasManySetAssociationsMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // addKt_examTimeTable!: Sequelize.HasManyAddAssociationMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // addKt_examTimeTables!: Sequelize.HasManyAddAssociationsMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // createKt_examTimeTable!: Sequelize.HasManyCreateAssociationMixin<kt_examTimeTable>
  // removeKt_examTimeTable!: Sequelize.HasManyRemoveAssociationMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // removeKt_examTimeTables!: Sequelize.HasManyRemoveAssociationsMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // hasKt_examTimeTable!: Sequelize.HasManyHasAssociationMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // hasKt_examTimeTables!: Sequelize.HasManyHasAssociationsMixin<
  //   kt_examTimeTable,
  //   kt_examTimeTableId
  // >
  // countKt_examTimeTables!: Sequelize.HasManyCountAssociationsMixin
  // kt_classRoom hasMany kt_questionBank via qb_classRoomId
  kt_questionBanks!: kt_questionBank[]
  getKt_questionBanks!: Sequelize.HasManyGetAssociationsMixin<kt_questionBank>
  setKt_questionBanks!: Sequelize.HasManySetAssociationsMixin<
    kt_questionBank,
    kt_questionBankId
  >
  addKt_questionBank!: Sequelize.HasManyAddAssociationMixin<
    kt_questionBank,
    kt_questionBankId
  >
  addKt_questionBanks!: Sequelize.HasManyAddAssociationsMixin<
    kt_questionBank,
    kt_questionBankId
  >
  createKt_questionBank!: Sequelize.HasManyCreateAssociationMixin<kt_questionBank>
  removeKt_questionBank!: Sequelize.HasManyRemoveAssociationMixin<
    kt_questionBank,
    kt_questionBankId
  >
  removeKt_questionBanks!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_questionBank,
    kt_questionBankId
  >
  hasKt_questionBank!: Sequelize.HasManyHasAssociationMixin<
    kt_questionBank,
    kt_questionBankId
  >
  hasKt_questionBanks!: Sequelize.HasManyHasAssociationsMixin<
    kt_questionBank,
    kt_questionBankId
  >
  countKt_questionBanks!: Sequelize.HasManyCountAssociationsMixin

  // kt_classRoom hasMany kt_student via st_classRoomId
  kt_students!: kt_student[]
  getKt_students!: Sequelize.HasManyGetAssociationsMixin<kt_student>
  setKt_students!: Sequelize.HasManySetAssociationsMixin<
    kt_student,
    kt_studentId
  >
  addKt_student!: Sequelize.HasManyAddAssociationMixin<kt_student, kt_studentId>
  addKt_students!: Sequelize.HasManyAddAssociationsMixin<
    kt_student,
    kt_studentId
  >
  createKt_student!: Sequelize.HasManyCreateAssociationMixin<kt_student>
  removeKt_student!: Sequelize.HasManyRemoveAssociationMixin<
    kt_student,
    kt_studentId
  >
  removeKt_students!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_student,
    kt_studentId
  >
  hasKt_student!: Sequelize.HasManyHasAssociationMixin<kt_student, kt_studentId>
  hasKt_students!: Sequelize.HasManyHasAssociationsMixin<
    kt_student,
    kt_studentId
  >
  countKt_students!: Sequelize.HasManyCountAssociationsMixin

  // kt_classRoom hasMany kt_teacher via tc_classRoomId
  // kt_teachers!: kt_teacher[]
  // getKt_teachers!: Sequelize.HasManyGetAssociationsMixin<kt_teacher>
  // setKt_teachers!: Sequelize.HasManySetAssociationsMixin<
  //   kt_teacher,
  //   kt_teacherId
  // >
  // addKt_teacher!: Sequelize.HasManyAddAssociationMixin<kt_teacher, kt_teacherId>
  // addKt_teachers!: Sequelize.HasManyAddAssociationsMixin<
  //   kt_teacher,
  //   kt_teacherId
  // >
  // createKt_teacher!: Sequelize.HasManyCreateAssociationMixin<kt_teacher>
  // removeKt_teacher!: Sequelize.HasManyRemoveAssociationMixin<
  //   kt_teacher,
  //   kt_teacherId
  // >
  // removeKt_teachers!: Sequelize.HasManyRemoveAssociationsMixin<
  //   kt_teacher,
  //   kt_teacherId
  // >
  // hasKt_teacher!: Sequelize.HasManyHasAssociationMixin<kt_teacher, kt_teacherId>
  // hasKt_teachers!: Sequelize.HasManyHasAssociationsMixin<
  //   kt_teacher,
  //   kt_teacherId
  // >
  // countKt_teachers!: Sequelize.HasManyCountAssociationsMixin
  // kt_classRoom belongsTo kt_school via cr_schoolId
  cr_school!: kt_school
  getCr_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setCr_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createCr_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>
  // kt_classRoom belongsTo kt_teacher via cr_classTeacherId
  cr_classTeacher!: kt_teacher
  getCr_classTeacher!: Sequelize.BelongsToGetAssociationMixin<kt_teacher>
  setCr_classTeacher!: Sequelize.BelongsToSetAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  createCr_classTeacher!: Sequelize.BelongsToCreateAssociationMixin<kt_teacher>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_classRoom {
    return kt_classRoom.init(
      {
        cr_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cr_division: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        cr_noOfStudents: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        cr_classTeacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_teacher',
            key: 'tc_id',
          },
        },
        cr_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        cr_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        cr_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        cr_class: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'kt_classRoom',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_classRoom_pkey',
            unique: true,
            fields: [{ name: 'cr_id' }],
          },
        ],
      },
    )
  }
}
