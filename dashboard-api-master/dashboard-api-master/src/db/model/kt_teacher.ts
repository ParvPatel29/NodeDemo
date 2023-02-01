import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_book, kt_bookId } from './kt_book'
import type { kt_classRoom, kt_classRoomId } from './kt_classRoom'
import type { kt_school, kt_schoolId } from './kt_school'
import type {
  kt_studentsRemark,
  kt_studentsRemarkId,
} from './kt_studentsRemark'
import type { kt_teacherLesson, kt_teacherLessonId } from './kt_teacherLesson'
import { kt_teacherLibrary, kt_teacherLibraryId } from './kt_teacherLibrary'

export interface kt_teacherAttributes {
  tc_id: number
  tc_fullName: string
  tc_email: string
  tc_staffId: string
  tc_schoolId: number
  tc_education?: string
  tc_phoneNumber: string
  tc_altPhoneNumber?: string
  tc_address?: string
  tc_profilePic?: string
  tc_degreeCertificate?: string
  tc_password: string
  tc_status: boolean
  tc_createdAt: Date
  tc_bloodGroup?: string
  tc_dateOfBirth?: string
  tc_region?: string
  tc_pincode?: string
  tc_country?: string
  tc_district?: string
  tc_circuit?: string
  tc_altEmail?: string
  tc_countryCode?: number
  tc_classRoomId?:number[]
  tc_subject?:string[]
}

export type kt_teacherPk = 'tc_id'
export type kt_teacherId = kt_teacher[kt_teacherPk]
export type kt_teacherOptionalAttributes =
  | 'tc_education'
  | 'tc_altPhoneNumber'
  | 'tc_address'
  | 'tc_profilePic'
  | 'tc_degreeCertificate'
  | 'tc_status'
  | 'tc_createdAt'
  | 'tc_bloodGroup'
  | 'tc_dateOfBirth'
  | 'tc_region'
  | 'tc_pincode'
  | 'tc_country'
  | 'tc_district'
  | 'tc_circuit'
  | 'tc_altEmail'
  | 'tc_countryCode'
export type kt_teacherCreationAttributes = Optional<
  kt_teacherAttributes,
  kt_teacherOptionalAttributes
>

export class kt_teacher
  extends Model<kt_teacherAttributes, kt_teacherCreationAttributes>
  implements kt_teacherAttributes
{
  tc_id!: number
  tc_fullName!: string
  tc_email!: string
  tc_staffId!: string
  tc_schoolId!: number
  tc_education?: string
  tc_phoneNumber!: string
  tc_altPhoneNumber?: string
  tc_address?: string
  tc_profilePic?: string
  tc_degreeCertificate?: string
  tc_password!: string
  tc_status!: boolean
  tc_createdAt!: Date
  tc_bloodGroup?: string
  tc_dateOfBirth?: string
  tc_region?: string
  tc_pincode?: string
  tc_country?: string
  tc_district?: string
  tc_circuit?: string
  tc_altEmail?: string
  tc_countryCode?: number
  tc_classRoomId?:number[]
  tc_subject?:string[]

  // kt_teacher belongsTo kt_classRoom via tc_classRoomId
  // tc_classRoom!: kt_classRoom
  // getTc_classRoom!: Sequelize.BelongsToGetAssociationMixin<kt_classRoom>
  // setTc_classRoom!: Sequelize.BelongsToSetAssociationMixin<
  //   kt_classRoom,
  //   kt_classRoomId
  // >

  // kt_teacher belongsTo kt_school via tc_schoolId
  tc_school!: kt_school
  getTc_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setTc_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createTc_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>
  // kt_teacher hasMany kt_classRoom via cr_classTeacherId
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
  // kt_teacher hasMany kt_studentsRemark via sr_teacherId
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
  // kt_teacher hasMany kt_teacherLesson via tl_teacherId
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

  // kt_teacher belongsToMany kt_book via tl_teacherId and tl_bookId
  tl_bookId_kt_books!: kt_book[]
  getTl_bookId_kt_books!: Sequelize.BelongsToManyGetAssociationsMixin<kt_book>
  setTl_bookId_kt_books!: Sequelize.BelongsToManySetAssociationsMixin<
    kt_book,
    kt_bookId
  >
  addTl_bookId_kt_book!: Sequelize.BelongsToManyAddAssociationMixin<
    kt_book,
    kt_bookId
  >
  addTl_bookId_kt_books!: Sequelize.BelongsToManyAddAssociationsMixin<
    kt_book,
    kt_bookId
  >
  createTl_bookId_kt_book!: Sequelize.BelongsToManyCreateAssociationMixin<kt_book>
  removeTl_bookId_kt_book!: Sequelize.BelongsToManyRemoveAssociationMixin<
    kt_book,
    kt_bookId
  >
  removeTl_bookId_kt_books!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    kt_book,
    kt_bookId
  >
  hasTl_bookId_kt_book!: Sequelize.BelongsToManyHasAssociationMixin<
    kt_book,
    kt_bookId
  >
  hasTl_bookId_kt_books!: Sequelize.BelongsToManyHasAssociationsMixin<
    kt_book,
    kt_bookId
  >
  countTl_bookId_kt_books!: Sequelize.BelongsToManyCountAssociationsMixin


  // kt_teacher hasMany kt_teacherLibrary via tl_teacherId
  kt_teacherLibraries!: kt_teacherLibrary[]
  getKt_teacherLibraries!: Sequelize.HasManyGetAssociationsMixin<kt_teacherLibrary>
  setKt_teacherLibraries!: Sequelize.HasManySetAssociationsMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  addKt_teacherLibrary!: Sequelize.HasManyAddAssociationMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  addKt_teacherLibraries!: Sequelize.HasManyAddAssociationsMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  createKt_teacherLibrary!: Sequelize.HasManyCreateAssociationMixin<kt_teacherLibrary>
  removeKt_teacherLibrary!: Sequelize.HasManyRemoveAssociationMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  removeKt_teacherLibraries!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  hasKt_teacherLibrary!: Sequelize.HasManyHasAssociationMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  hasKt_teacherLibraries!: Sequelize.HasManyHasAssociationsMixin<
    kt_teacherLibrary,
    kt_teacherLibraryId
  >
  countKt_teacherLibraries!: Sequelize.HasManyCountAssociationsMixin


  static initModel(sequelize: Sequelize.Sequelize): typeof kt_teacher {
    return kt_teacher.init(
      {
        tc_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tc_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tc_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_teacher_tc_email_key',
        },
        tc_staffId: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: 'kt_teacher_tc_staffId_key',
        },
        tc_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        tc_education: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: 'kt_teacher_tc_phoneNumber_key',
        },
        tc_altPhoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: true,
          unique: 'kt_teacher_tc_altPhoneNumber_key',
        },
        tc_address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        tc_profilePic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_degreeCertificate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tc_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        tc_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tc_bloodGroup: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_dateOfBirth: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        tc_country: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_pincode: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_region: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_altEmail: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tc_countryCode: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        tc_classRoomId : {
          type:DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true,
          // references: {
          //   model: 'kt_classRoom',
          //   key: 'cr_id',
          // },
        },
        tc_subject:{
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        }
      },
      {
        sequelize,
        tableName: 'kt_teacher',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_teacher_pkey',
            unique: true,
            fields: [{ name: 'tc_id' }],
          },
          {
            name: 'kt_teacher_tc_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'tc_altPhoneNumber' }],
          },
          {
            name: 'kt_teacher_tc_email_key',
            unique: true,
            fields: [{ name: 'tc_email' }],
          },
          {
            name: 'kt_teacher_tc_phoneNumber_key',
            unique: true,
            fields: [{ name: 'tc_phoneNumber' }],
          },
          {
            name: 'kt_teacher_tc_staffId_key',
            unique: true,
            fields: [{ name: 'tc_staffId' }],
          },
        ],
      },
    )
  }
}
