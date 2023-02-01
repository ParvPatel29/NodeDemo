import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_book, kt_bookId } from './kt_book'
import type { kt_classRoom, kt_classRoomId } from './kt_classRoom'
import type { kt_review, kt_reviewId } from './kt_review'
import type { kt_school, kt_schoolId } from './kt_school'
import type {
  kt_studentAttendance,
  kt_studentAttendanceId,
} from './kt_studentAttendance'
import type {
  kt_studentLibrary,
  kt_studentLibraryId,
} from './kt_studentLibrary'
import type {
  kt_studentsRemark,
  kt_studentsRemarkId,
} from './kt_studentsRemark'

export interface kt_studentAttributes {
  st_id: number
  st_fullName: string
  st_parentName?: string
  st_phoneNumber?: string
  st_altPhoneNumber?: string
  st_email?: string
  st_region?: string
  st_district?: string
  st_circuit?: string
  st_profilePic?: string
  st_bloodGroup?: string
  st_dateOfBirth?: string
  st_address?: string
  st_status: boolean
  st_password: string
  st_createdAt: Date
  st_classRoomId?: number
  st_schoolId?: number
  st_studentId: string
  st_altEmail?: string
  st_parentEmail?: string
  st_areaOfStudy?: string
  st_curricularActivities?: string
  st_countryCode?: number
  st_class?: string
  st_division ?:string
  st_studentType?: number
}

export type kt_studentPk = 'st_id'
export type kt_studentId = kt_student[kt_studentPk]
export type kt_studentOptionalAttributes =
  | 'st_id'
  | 'st_parentName'
  | 'st_phoneNumber'
  | 'st_altPhoneNumber'
  | 'st_email'
  | 'st_region'
  | 'st_district'
  | 'st_circuit'
  | 'st_profilePic'
  | 'st_bloodGroup'
  | 'st_dateOfBirth'
  | 'st_address'
  | 'st_status'
  | 'st_createdAt'
  | 'st_classRoomId'
  | 'st_schoolId'
  | 'st_altEmail'
  | 'st_parentEmail'
  | 'st_areaOfStudy'
  | 'st_curricularActivities'
  | 'st_countryCode'
  | 'st_class'
  | 'st_division'
  | 'st_studentType'
  
export type kt_studentCreationAttributes = Optional<
  kt_studentAttributes,
  kt_studentOptionalAttributes
>

export class kt_student
  extends Model<kt_studentAttributes, kt_studentCreationAttributes>
  implements kt_studentAttributes
{
  st_id!: number
  st_fullName!: string
  st_parentName?: string
  st_phoneNumber?: string
  st_altPhoneNumber?: string
  st_email?: string
  st_region?: string
  st_district?: string
  st_circuit?: string
  st_profilePic?: string
  st_bloodGroup?: string
  st_dateOfBirth?: string
  st_address?: string
  st_status!: boolean
  st_password!: string
  st_createdAt!: Date
  st_classRoomId?: number
  st_schoolId?: number
  st_studentId!: string
  st_altEmail?: string
  st_parentEmail?: string
  st_areaOfStudy?: string
  st_curricularActivities?: string
  st_countryCode?: number
  st_class ?: string
  st_division ?:string
  st_studentType?:number

  // kt_student belongsTo kt_classRoom via st_classRoomId
  st_classRoom!: kt_classRoom
  getSt_classRoom!: Sequelize.BelongsToGetAssociationMixin<kt_classRoom>
  setSt_classRoom!: Sequelize.BelongsToSetAssociationMixin<
    kt_classRoom,
    kt_classRoomId
  >
  createSt_classRoom!: Sequelize.BelongsToCreateAssociationMixin<kt_classRoom>
  // kt_student belongsTo kt_school via st_schoolId
  st_school!: kt_school
  getSt_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setSt_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createSt_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>
  // kt_student belongsToMany kt_book via sl_studentId and sl_bookId
  sl_bookId_kt_books!: kt_book[]
  getSl_bookId_kt_books!: Sequelize.BelongsToManyGetAssociationsMixin<kt_book>
  setSl_bookId_kt_books!: Sequelize.BelongsToManySetAssociationsMixin<
    kt_book,
    kt_bookId
  >
  addSl_bookId_kt_book!: Sequelize.BelongsToManyAddAssociationMixin<
    kt_book,
    kt_bookId
  >
  addSl_bookId_kt_books!: Sequelize.BelongsToManyAddAssociationsMixin<
    kt_book,
    kt_bookId
  >
  createSl_bookId_kt_book!: Sequelize.BelongsToManyCreateAssociationMixin<kt_book>
  removeSl_bookId_kt_book!: Sequelize.BelongsToManyRemoveAssociationMixin<
    kt_book,
    kt_bookId
  >
  removeSl_bookId_kt_books!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    kt_book,
    kt_bookId
  >
  hasSl_bookId_kt_book!: Sequelize.BelongsToManyHasAssociationMixin<
    kt_book,
    kt_bookId
  >
  hasSl_bookId_kt_books!: Sequelize.BelongsToManyHasAssociationsMixin<
    kt_book,
    kt_bookId
  >
  countSl_bookId_kt_books!: Sequelize.BelongsToManyCountAssociationsMixin
  // kt_student hasMany kt_review via br_studentId
  kt_reviews!: kt_review[]
  getKt_reviews!: Sequelize.HasManyGetAssociationsMixin<kt_review>
  setKt_reviews!: Sequelize.HasManySetAssociationsMixin<kt_review, kt_reviewId>
  addKt_review!: Sequelize.HasManyAddAssociationMixin<kt_review, kt_reviewId>
  addKt_reviews!: Sequelize.HasManyAddAssociationsMixin<kt_review, kt_reviewId>
  createKt_review!: Sequelize.HasManyCreateAssociationMixin<kt_review>
  removeKt_review!: Sequelize.HasManyRemoveAssociationMixin<
    kt_review,
    kt_reviewId
  >
  removeKt_reviews!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_review,
    kt_reviewId
  >
  hasKt_review!: Sequelize.HasManyHasAssociationMixin<kt_review, kt_reviewId>
  hasKt_reviews!: Sequelize.HasManyHasAssociationsMixin<kt_review, kt_reviewId>
  countKt_reviews!: Sequelize.HasManyCountAssociationsMixin
  // kt_student hasMany kt_studentAttendance via sa_studentId
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
  // kt_student hasMany kt_studentLibrary via sl_studentId
  kt_studentLibraries!: kt_studentLibrary[]
  getKt_studentLibraries!: Sequelize.HasManyGetAssociationsMixin<kt_studentLibrary>
  setKt_studentLibraries!: Sequelize.HasManySetAssociationsMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  addKt_studentLibrary!: Sequelize.HasManyAddAssociationMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  addKt_studentLibraries!: Sequelize.HasManyAddAssociationsMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  createKt_studentLibrary!: Sequelize.HasManyCreateAssociationMixin<kt_studentLibrary>
  removeKt_studentLibrary!: Sequelize.HasManyRemoveAssociationMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  removeKt_studentLibraries!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  hasKt_studentLibrary!: Sequelize.HasManyHasAssociationMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  hasKt_studentLibraries!: Sequelize.HasManyHasAssociationsMixin<
    kt_studentLibrary,
    kt_studentLibraryId
  >
  countKt_studentLibraries!: Sequelize.HasManyCountAssociationsMixin
  // kt_student hasMany kt_studentsRemark via sr_studentId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_student {
    return kt_student.init(
      {
        st_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        st_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        st_parentName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_student_st_phoneNumber_key',
        },
        st_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_student_st_altPhoneNumber_key',
        },
        st_email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_student_st_email_key',
        },
        st_region: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_profilePic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_bloodGroup: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_dateOfBirth: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        st_address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        st_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        st_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        st_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        st_classRoomId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'kt_classRoom',
            key: 'cr_id',
          },
        },
        st_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        st_studentId: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        st_altEmail: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_parentEmail: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_areaOfStudy: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_curricularActivities: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_countryCode: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        st_class:{
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_division:{
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        st_studentType:{
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue:1
        }
        
      },
      {
        sequelize,
        tableName: 'kt_student',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_student_pkey',
            unique: true,
            fields: [{ name: 'st_id' }],
          },
          {
            name: 'kt_student_st_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'st_altPhoneNumber' }],
          },
          {
            name: 'kt_student_st_email_key',
            unique: true,
            fields: [{ name: 'st_email' }],
          },
          {
            name: 'kt_student_st_phoneNumber_key',
            unique: true,
            fields: [{ name: 'st_phoneNumber' }],
          },
        ],
      },
    )
  }
}
