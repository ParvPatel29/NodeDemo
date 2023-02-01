import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_review, kt_reviewId } from './kt_review'
import type { kt_student, kt_studentId } from './kt_student'
import type {
  kt_studentLibrary,
  kt_studentLibraryId,
} from './kt_studentLibrary'
import { kt_teacher, kt_teacherId } from './kt_teacher'
import { kt_teacherLibrary, kt_teacherLibraryId } from './kt_teacherLibrary'

export interface kt_bookAttributes {
  bk_id: number
  bk_language: string
  bk_title: string
  bk_author?: string
  bk_description: string
  bk_noOfPages?: number
  bk_publishedDate: string
  bk_isFree: boolean
  bk_isPhysicalAvailable: boolean
  bk_price?: number
  bk_publisher?: string
  bk_edition?: string
  bk_audio?: string
  bk_epub?: string
  bk_preview: string
  bk_pdf?: string
  bk_video?: string
  bk_previewVideo?: string
  bk_status: boolean
  bk_createdAt: Date
  bk_mainCategory: string
  bk_category?: string
  bk_subCategory?: string
  bk_topic?: string
  bk_genre?: string[]
  bk_whoCanRead: string[]
}

export type kt_bookPk = 'bk_id'
export type kt_bookId = kt_book[kt_bookPk]
export type kt_bookOptionalAttributes =
  | 'bk_author'
  | 'bk_noOfPages'
  | 'bk_isFree'
  | 'bk_price'
  | 'bk_publisher'
  | 'bk_edition'
  | 'bk_audio'
  | 'bk_epub'
  | 'bk_pdf'
  | 'bk_video'
  | 'bk_previewVideo'
  | 'bk_status'
  | 'bk_createdAt'
  | 'bk_category'
  | 'bk_subCategory'
  | 'bk_topic'
  | 'bk_genre'
  | 'bk_whoCanRead'
export type kt_bookCreationAttributes = Optional<
  kt_bookAttributes,
  kt_bookOptionalAttributes
>

export class kt_book
  extends Model<kt_bookAttributes, kt_bookCreationAttributes>
  implements kt_bookAttributes
{
  bk_id!: number
  bk_language!: string
  bk_title!: string
  bk_author?: string
  bk_description!: string
  bk_noOfPages?: number
  bk_publishedDate!: string
  bk_isFree!: boolean
  bk_isPhysicalAvailable!: boolean
  bk_price?: number
  bk_publisher?: string
  bk_edition?: string
  bk_audio?: string
  bk_epub?: string
  bk_preview!: string
  bk_pdf?: string
  bk_video?: string
  bk_previewVideo?: string
  bk_status!: boolean
  bk_createdAt!: Date
  bk_mainCategory!: string
  bk_category?: string
  bk_subCategory?: string
  bk_topic?: string
  bk_genre?: string[]
  bk_whoCanRead!: string[]

  // kt_book hasMany kt_review via br_bookId
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

  // kt_book belongsToMany kt_teacher via tl_bookId and tl_teacherId
  tl_teacherId_kt_teachers!: kt_teacher[]
  getTl_teacherId_kt_teachers!: Sequelize.BelongsToManyGetAssociationsMixin<kt_teacher>
  setTl_teacherId_kt_teachers!: Sequelize.BelongsToManySetAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  addTl_teacherId_kt_teacher!: Sequelize.BelongsToManyAddAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  addTl_teacherId_kt_teachers!: Sequelize.BelongsToManyAddAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  createTl_teacherId_kt_teacher!: Sequelize.BelongsToManyCreateAssociationMixin<kt_student>
  removeTl_teacherId_kt_teacher!: Sequelize.BelongsToManyRemoveAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  removeTl_teacherId_kt_teachers!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  hasTl_teacherId_kt_teacher!: Sequelize.BelongsToManyHasAssociationMixin<
    kt_teacher,
    kt_teacherId
  >
  hasTl_teacherId_kt_teachers!: Sequelize.BelongsToManyHasAssociationsMixin<
    kt_teacher,
    kt_teacherId
  >
  countTl_teacherId_kt_teachers!: Sequelize.BelongsToManyCountAssociationsMixin

  // kt_book hasMany kt_teacherLibrary via tl_bookId
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

  // kt_book belongsToMany kt_student via sl_bookId and sl_studentId
  sl_studentId_kt_students!: kt_student[]
  getSl_studentId_kt_students!: Sequelize.BelongsToManyGetAssociationsMixin<kt_student>
  setSl_studentId_kt_students!: Sequelize.BelongsToManySetAssociationsMixin<
    kt_student,
    kt_studentId
  >
  addSl_studentId_kt_student!: Sequelize.BelongsToManyAddAssociationMixin<
    kt_student,
    kt_studentId
  >
  addSl_studentId_kt_students!: Sequelize.BelongsToManyAddAssociationsMixin<
    kt_student,
    kt_studentId
  >
  createSl_studentId_kt_student!: Sequelize.BelongsToManyCreateAssociationMixin<kt_student>
  removeSl_studentId_kt_student!: Sequelize.BelongsToManyRemoveAssociationMixin<
    kt_student,
    kt_studentId
  >
  removeSl_studentId_kt_students!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    kt_student,
    kt_studentId
  >
  hasSl_studentId_kt_student!: Sequelize.BelongsToManyHasAssociationMixin<
    kt_student,
    kt_studentId
  >
  hasSl_studentId_kt_students!: Sequelize.BelongsToManyHasAssociationsMixin<
    kt_student,
    kt_studentId
  >
  countSl_studentId_kt_students!: Sequelize.BelongsToManyCountAssociationsMixin
  // kt_book hasMany kt_studentLibrary via sl_bookId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_book {
    return kt_book.init(
      {
        bk_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        bk_language: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        bk_title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        bk_author: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        bk_noOfPages: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        bk_publishedDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        bk_isFree: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        bk_isPhysicalAvailable: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        bk_price: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
        },
        bk_publisher: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_edition: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_audio: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_epub: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_preview: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        bk_pdf: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_video: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_previewVideo: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        bk_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        bk_mainCategory: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        bk_category: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_subCategory: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_topic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        bk_genre: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        bk_whoCanRead: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_book',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_book_pkey',
            unique: true,
            fields: [{ name: 'bk_id' }],
          },
        ],
      },
    )
  }
}
