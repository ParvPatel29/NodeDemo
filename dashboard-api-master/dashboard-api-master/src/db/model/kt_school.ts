import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_classRoom, kt_classRoomId } from './kt_classRoom'
import type { kt_exam, kt_examId } from './kt_exam'
import type { kt_examTimeTable, kt_examTimeTableId } from './kt_examTimeTable'
import type { kt_questionBank, kt_questionBankId } from './kt_questionBank'
import type { kt_schoolStaff, kt_schoolStaffId } from './kt_schoolStaff'
import type { kt_student, kt_studentId } from './kt_student'
import type {
  kt_studentAttendance,
  kt_studentAttendanceId,
} from './kt_studentAttendance'
import type {
  kt_studentsRemark,
  kt_studentsRemarkId,
} from './kt_studentsRemark'
import type { kt_teacher, kt_teacherId } from './kt_teacher'
import type { kt_teacherLesson, kt_teacherLessonId } from './kt_teacherLesson'
import { kt_termlyScheme, kt_termlySchemeId } from './kt_termlyScheme'
import { kt_weeklyLessonPlan, kt_weeklyLessonPlanId } from './kt_weeklyLessonPlan'
import { kt_yearlyScheme, kt_yearlySchemeId } from './kt_yearlyScheme'

export interface kt_schoolAttributes {
  sc_id: number
  sc_schoolName: string
  sc_schoolType: string
  sc_schoolId?: string
  sc_schoolHeadName: string
  sc_region: string
  sc_district?: string
  sc_circuit?: string
  sc_email: string
  sc_phoneNumber: string
  sc_altPhoneNumber?: string
  sc_password: string
  sc_address?: string
  sc_status: boolean
  sc_createdAt: Date
  sc_town?: string
  sc_latitude?: string
  sc_longitude?: string
  sc_noOfClassroom?: number
  sc_boardingFacilities?: boolean
  sc_sanitaryFacilities?: boolean
  sc_scienceLab?: boolean
  sc_assemblyHall?: boolean
  sc_libraryFacilities?: boolean
  sc_diningFacilities?: boolean
  sc_schoolBus?: boolean
  sc_sportingFacilities?: boolean
  sc_staffAccommodation?: boolean
  sc_description?: string
}

export type kt_schoolPk = 'sc_id'
export type kt_schoolId = kt_school[kt_schoolPk]
export type kt_schoolOptionalAttributes =
  | 'sc_id'
  | 'sc_schoolId'
  | 'sc_district'
  | 'sc_circuit'
  | 'sc_altPhoneNumber'
  | 'sc_address'
  | 'sc_status'
  | 'sc_createdAt'
  | 'sc_town'
  | 'sc_latitude'
  | 'sc_longitude'
  | 'sc_noOfClassroom'
  | 'sc_boardingFacilities'
  | 'sc_sanitaryFacilities'
  | 'sc_scienceLab'
  | 'sc_assemblyHall'
  | 'sc_libraryFacilities'
  | 'sc_diningFacilities'
  | 'sc_schoolBus'
  | 'sc_sportingFacilities'
  | 'sc_staffAccommodation'
  | 'sc_description'
export type kt_schoolCreationAttributes = Optional<
  kt_schoolAttributes,
  kt_schoolOptionalAttributes
>

export class kt_school
  extends Model<kt_schoolAttributes, kt_schoolCreationAttributes>
  implements kt_schoolAttributes
{
  sc_id!: number
  sc_schoolName!: string
  sc_schoolType!: string
  sc_schoolId?: string
  sc_schoolHeadName!: string
  sc_region!: string
  sc_district?: string
  sc_circuit?: string
  sc_email!: string
  sc_phoneNumber!: string
  sc_altPhoneNumber?: string
  sc_password!: string
  sc_address?: string
  sc_status!: boolean
  sc_createdAt!: Date
  sc_town?: string
  sc_latitude?: string
  sc_longitude?: string
  sc_noOfClassroom?: number
  sc_boardingFacilities?: boolean
  sc_sanitaryFacilities?: boolean
  sc_scienceLab?: boolean
  sc_assemblyHall?: boolean
  sc_libraryFacilities?: boolean
  sc_diningFacilities?: boolean
  sc_schoolBus?: boolean
  sc_sportingFacilities?: boolean
  sc_staffAccommodation?: boolean
  sc_description?: string



  // kt_school hasMany kt_classRoom via cr_schoolId
  kt_classRooms!: kt_classRoom[]
  getKt_classRooms!: Sequelize.HasManyGetAssociationsMixin<kt_classRoom>
  setKt_classRooms!: Sequelize.HasManySetAssociationsMixin<
    kt_classRoom,
    kt_classRoomId
  >
  addKt_classRoom!: Sequelize.HasManyAddAssociationMixin<
    kt_classRoom,
    kt_classRoomId
  >
  addKt_classRooms!: Sequelize.HasManyAddAssociationsMixin<
    kt_classRoom,
    kt_classRoomId
  >
  createKt_classRoom!: Sequelize.HasManyCreateAssociationMixin<kt_classRoom>
  removeKt_classRoom!: Sequelize.HasManyRemoveAssociationMixin<
    kt_classRoom,
    kt_classRoomId
  >
  removeKt_classRooms!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_classRoom,
    kt_classRoomId
  >
  hasKt_classRoom!: Sequelize.HasManyHasAssociationMixin<
    kt_classRoom,
    kt_classRoomId
  >
  hasKt_classRooms!: Sequelize.HasManyHasAssociationsMixin<
    kt_classRoom,
    kt_classRoomId
  >
  countKt_classRooms!: Sequelize.HasManyCountAssociationsMixin
  // kt_school hasMany kt_exam via ex_schoolId
  kt_exams!: kt_exam[]
  getKt_exams!: Sequelize.HasManyGetAssociationsMixin<kt_exam>
  setKt_exams!: Sequelize.HasManySetAssociationsMixin<kt_exam, kt_examId>
  addKt_exam!: Sequelize.HasManyAddAssociationMixin<kt_exam, kt_examId>
  addKt_exams!: Sequelize.HasManyAddAssociationsMixin<kt_exam, kt_examId>
  createKt_exam!: Sequelize.HasManyCreateAssociationMixin<kt_exam>
  removeKt_exam!: Sequelize.HasManyRemoveAssociationMixin<kt_exam, kt_examId>
  removeKt_exams!: Sequelize.HasManyRemoveAssociationsMixin<kt_exam, kt_examId>
  hasKt_exam!: Sequelize.HasManyHasAssociationMixin<kt_exam, kt_examId>
  hasKt_exams!: Sequelize.HasManyHasAssociationsMixin<kt_exam, kt_examId>
  countKt_exams!: Sequelize.HasManyCountAssociationsMixin
  // kt_school hasMany kt_examTimeTable via et_schoolId
  kt_examTimeTables!: kt_examTimeTable[]
  getKt_examTimeTables!: Sequelize.HasManyGetAssociationsMixin<kt_examTimeTable>
  setKt_examTimeTables!: Sequelize.HasManySetAssociationsMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  addKt_examTimeTable!: Sequelize.HasManyAddAssociationMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  addKt_examTimeTables!: Sequelize.HasManyAddAssociationsMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  createKt_examTimeTable!: Sequelize.HasManyCreateAssociationMixin<kt_examTimeTable>
  removeKt_examTimeTable!: Sequelize.HasManyRemoveAssociationMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  removeKt_examTimeTables!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  hasKt_examTimeTable!: Sequelize.HasManyHasAssociationMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  hasKt_examTimeTables!: Sequelize.HasManyHasAssociationsMixin<
    kt_examTimeTable,
    kt_examTimeTableId
  >
  countKt_examTimeTables!: Sequelize.HasManyCountAssociationsMixin
  // kt_school hasMany kt_questionBank via qb_schoolId
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
  // kt_school hasMany kt_schoolStaff via ss_schoolId
  kt_schoolStaffs!: kt_schoolStaff[]
  getKt_schoolStaffs!: Sequelize.HasManyGetAssociationsMixin<kt_schoolStaff>
  setKt_schoolStaffs!: Sequelize.HasManySetAssociationsMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  addKt_schoolStaff!: Sequelize.HasManyAddAssociationMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  addKt_schoolStaffs!: Sequelize.HasManyAddAssociationsMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  createKt_schoolStaff!: Sequelize.HasManyCreateAssociationMixin<kt_schoolStaff>
  removeKt_schoolStaff!: Sequelize.HasManyRemoveAssociationMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  removeKt_schoolStaffs!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  hasKt_schoolStaff!: Sequelize.HasManyHasAssociationMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  hasKt_schoolStaffs!: Sequelize.HasManyHasAssociationsMixin<
    kt_schoolStaff,
    kt_schoolStaffId
  >
  countKt_schoolStaffs!: Sequelize.HasManyCountAssociationsMixin
  
  // kt_school hasMany kt_student via st_schoolId
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

  // kt_school hasMany kt_termlyScheme via tsc_schoolId
  kt_termlyScheme!: kt_termlyScheme[]
  getKt_TermlySchemes!: Sequelize.HasManyGetAssociationsMixin<kt_termlyScheme>
  setKt_TermlySchemes!: Sequelize.HasManySetAssociationsMixin<
    kt_termlyScheme,
    kt_termlySchemeId
  >
  addKt_termlyScheme!: Sequelize.HasManyAddAssociationMixin<kt_termlyScheme, kt_termlySchemeId>
  addKt_TermlySchemes!: Sequelize.HasManyAddAssociationsMixin<
    kt_termlyScheme,
    kt_termlySchemeId
  >
  createKt_termlyScheme!: Sequelize.HasManyCreateAssociationMixin<kt_termlyScheme>
  removeKt_termlyScheme!: Sequelize.HasManyRemoveAssociationMixin<
    kt_termlyScheme,
    kt_termlySchemeId
  >
  removeKt_TermlySchemes!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_termlyScheme,
    kt_termlySchemeId
  >
  hasKt_termlyScheme!: Sequelize.HasManyHasAssociationMixin<kt_termlyScheme, kt_termlySchemeId>
  hasKt_TermlySchemes!: Sequelize.HasManyHasAssociationsMixin<
    kt_termlyScheme,
    kt_termlySchemeId
  >
  countKt_TermlySchemes!: Sequelize.HasManyCountAssociationsMixin

  // kt_school hasMany kt_yearlyScheme via ysc_schoolId
  kt_yearlyScheme!: kt_yearlyScheme[]
  getKt_YearlySchemes!: Sequelize.HasManyGetAssociationsMixin<kt_yearlyScheme>
  setKt_YearlySchemes!: Sequelize.HasManySetAssociationsMixin<
    kt_yearlyScheme,
    kt_yearlySchemeId
  >
  addKt_YearlyScheme!: Sequelize.HasManyAddAssociationMixin<kt_yearlyScheme, kt_yearlySchemeId>
  addKt_YearlySchemes!: Sequelize.HasManyAddAssociationsMixin<
    kt_yearlyScheme,
    kt_yearlySchemeId
  >
  createKt_YearlyScheme!: Sequelize.HasManyCreateAssociationMixin<kt_yearlyScheme>
  removeKt_YearlyScheme!: Sequelize.HasManyRemoveAssociationMixin<
    kt_yearlyScheme,
    kt_yearlySchemeId
  >
  removeKt_YearlySchemes!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_yearlyScheme,
    kt_yearlySchemeId
  >
  hasKt_YearlyScheme!: Sequelize.HasManyHasAssociationMixin<kt_yearlyScheme, kt_yearlySchemeId>
  hasKt_YearlySchemes!: Sequelize.HasManyHasAssociationsMixin<
    kt_yearlyScheme,
    kt_yearlySchemeId
  >
  countKt_YearlySchemes!: Sequelize.HasManyCountAssociationsMixin

  // kt_school hasMany kt_weeklyLessonPlan via wlp_schoolId
  
  kt_weeklyLessonPlan!: kt_weeklyLessonPlan[]
  getKt_weeklyLessonPlanes!: Sequelize.HasManyGetAssociationsMixin<kt_weeklyLessonPlan>
  setKt_weeklyLessonPlanes!: Sequelize.HasManySetAssociationsMixin<
    kt_weeklyLessonPlan,
    kt_weeklyLessonPlanId
  >
  addKt_weeklyLessonPlan!: Sequelize.HasManyAddAssociationMixin<kt_weeklyLessonPlan, kt_weeklyLessonPlanId>
  addKt_weeklyLessonPlanes!: Sequelize.HasManyAddAssociationsMixin<
    kt_weeklyLessonPlan,
    kt_weeklyLessonPlanId
  >
  createKt_weeklyLessonPlan!: Sequelize.HasManyCreateAssociationMixin<kt_weeklyLessonPlan>
  removeKt_weeklyLessonPlan!: Sequelize.HasManyRemoveAssociationMixin<
    kt_weeklyLessonPlan,
    kt_weeklyLessonPlanId
  >
  removeKt_weeklyLessonPlanes!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_weeklyLessonPlan,
    kt_weeklyLessonPlanId
  >
  hasKt_weeklyLessonPlan!: Sequelize.HasManyHasAssociationMixin<kt_weeklyLessonPlan, kt_weeklyLessonPlanId>
  hasKt_weeklyLessonPlanes!: Sequelize.HasManyHasAssociationsMixin<
    kt_weeklyLessonPlan,
    kt_weeklyLessonPlanId
  >
  countKt_weeklyLessonPlanes!: Sequelize.HasManyCountAssociationsMixin

  // kt_school hasMany kt_studentAttendance via sa_schoolId
  kt_studentAttendances!: kt_studentAttendance[]
  getKt_studentAttendances!: Sequelize.HasManyGetAssociationsMixin<kt_studentAttendance>
  setKt_studentAttendances!: Sequelize.HasManySetAssociationsMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  addKt_studentAttendance!: Sequelize.HasManyAddAssociationMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  addKt_studentAttendances!: Sequelize.HasManyAddAssociationsMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  createKt_studentAttendance!: Sequelize.HasManyCreateAssociationMixin<kt_studentAttendance>
  removeKt_studentAttendance!: Sequelize.HasManyRemoveAssociationMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  removeKt_studentAttendances!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  hasKt_studentAttendance!: Sequelize.HasManyHasAssociationMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  hasKt_studentAttendances!: Sequelize.HasManyHasAssociationsMixin<
    kt_studentAttendance,
    kt_studentAttendanceId
  >
  countKt_studentAttendances!: Sequelize.HasManyCountAssociationsMixin
  // kt_school hasMany kt_studentsRemark via sr_schoolId
  kt_studentsRemarks!: kt_studentsRemark[]
  getKt_studentsRemarks!: Sequelize.HasManyGetAssociationsMixin<kt_studentsRemark>
  setKt_studentsRemarks!: Sequelize.HasManySetAssociationsMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  addKt_studentsRemark!: Sequelize.HasManyAddAssociationMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  addKt_studentsRemarks!: Sequelize.HasManyAddAssociationsMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  createKt_studentsRemark!: Sequelize.HasManyCreateAssociationMixin<kt_studentsRemark>
  removeKt_studentsRemark!: Sequelize.HasManyRemoveAssociationMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  removeKt_studentsRemarks!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  hasKt_studentsRemark!: Sequelize.HasManyHasAssociationMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  hasKt_studentsRemarks!: Sequelize.HasManyHasAssociationsMixin<
    kt_studentsRemark,
    kt_studentsRemarkId
  >
  countKt_studentsRemarks!: Sequelize.HasManyCountAssociationsMixin
  // kt_school hasMany kt_teacher via tc_schoolId
  kt_teachers!: kt_teacher[]
  getKt_teachers!: Sequelize.HasManyGetAssociationsMixin<kt_teacher>
  setKt_teachers!: Sequelize.HasManySetAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  addKt_teacher!: Sequelize.HasManyAddAssociationMixin<kt_teacher, kt_teacherId>
  addKt_teachers!: Sequelize.HasManyAddAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  createKt_teacher!: Sequelize.HasManyCreateAssociationMixin<kt_teacher>
  removeKt_teacher!: Sequelize.HasManyRemoveAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  removeKt_teachers!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  hasKt_teacher!: Sequelize.HasManyHasAssociationMixin<kt_teacher, kt_teacherId>
  hasKt_teachers!: Sequelize.HasManyHasAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  countKt_teachers!: Sequelize.HasManyCountAssociationsMixin
  // kt_school hasMany kt_teacherLesson via tl_schoolId
  kt_teacherLessons!: kt_teacherLesson[]
  getKt_teacherLessons!: Sequelize.HasManyGetAssociationsMixin<kt_teacherLesson>
  setKt_teacherLessons!: Sequelize.HasManySetAssociationsMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  addKt_teacherLesson!: Sequelize.HasManyAddAssociationMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  addKt_teacherLessons!: Sequelize.HasManyAddAssociationsMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  createKt_teacherLesson!: Sequelize.HasManyCreateAssociationMixin<kt_teacherLesson>
  removeKt_teacherLesson!: Sequelize.HasManyRemoveAssociationMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  removeKt_teacherLessons!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  hasKt_teacherLesson!: Sequelize.HasManyHasAssociationMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  hasKt_teacherLessons!: Sequelize.HasManyHasAssociationsMixin<
    kt_teacherLesson,
    kt_teacherLessonId
  >
  countKt_teacherLessons!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_school {
    return kt_school.init(
      {
        sc_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        sc_schoolName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_school_sc_schoolName_key',
        },
        sc_schoolType: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        sc_schoolId: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_school_sc_schoolId_key',
        },
        sc_schoolHeadName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        sc_region: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        sc_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sc_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sc_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_school_sc_email_key',
        },
        sc_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          // unique: 'kt_school_sc_phoneNumber_key',
        },
        sc_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_school_sc_altPhoneNumber_key',
        },
        sc_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        sc_address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        sc_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        sc_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        sc_town: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sc_latitude: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sc_longitude: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sc_noOfClassroom: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        sc_boardingFacilities: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_sanitaryFacilities: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_scienceLab: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_assemblyHall: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_libraryFacilities: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_diningFacilities: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_schoolBus: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_sportingFacilities: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_staffAccommodation: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sc_description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_school',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_school_pkey',
            unique: true,
            fields: [{ name: 'sc_id' }],
          },
          // {
          //   name: 'kt_school_sc_altPhoneNumber_key',
          //   unique: true,
          //   fields: [{ name: 'sc_altPhoneNumber' }],
          // },
          // {
          //   name: 'kt_school_sc_email_key',
          //   unique: true,
          //   fields: [{ name: 'sc_email' }],
          // },
          // {
          //   name: 'kt_school_sc_phoneNumber_key',
          //   unique: true,
          //   fields: [{ name: 'sc_phoneNumber' }],
          // },
          {
            name: 'kt_school_sc_schoolId_key',
            unique: true,
            fields: [{ name: 'sc_schoolId' }],
          },
          // {
          //   name: 'kt_school_sc_schoolName_key',
          //   unique: true,
          //   fields: [{ name: 'sc_schoolName' }],
          // },
        ],
      },
    )
  }
}
