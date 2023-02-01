import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_book, kt_bookId } from './kt_book'
import { kt_teacher,kt_teacherId } from './kt_teacher'

export interface kt_teacherLibraryAttributes {
  kt_tlId:number
  tl_teacherId: number
  tl_bookId: number
  tl_createdAt: Date
  tl_updatedAt: Date
}

export type kt_teacherLibrarypk = 'tl_teacherId' | 'tl_bookId' | 'kt_tlId'
export type kt_teacherLibraryId = kt_teacherLibrary[kt_teacherLibrarypk]
export type kt_teacherLibraryOptionalAttributes =
  | 'tl_createdAt'
  | 'tl_updatedAt'
export type kt_teacherLibraryCreationAttributes = Optional<
  kt_teacherLibraryAttributes,
  kt_teacherLibraryOptionalAttributes
>

export class kt_teacherLibrary
  extends Model<
    kt_teacherLibraryAttributes,
    kt_teacherLibraryCreationAttributes
  >
  implements kt_teacherLibraryAttributes
{
  kt_tlId!:number
  tl_teacherId!: number
  tl_bookId!: number
  tl_createdAt!: Date
  tl_updatedAt!: Date

  // kt_teacherLibrary belongsTo kt_book via tl_bookId
  tl_book!: kt_book
  getTl_book!: Sequelize.BelongsToGetAssociationMixin<kt_book>
  setTl_book!: Sequelize.BelongsToSetAssociationMixin<kt_book, kt_bookId>
  createTl_book!: Sequelize.BelongsToCreateAssociationMixin<kt_book>
  // kt_teacherLibrary belongsTo kt_teacher via tl_teacherId
  tl_teacher!: kt_teacher
  getTl_teacher!: Sequelize.BelongsToGetAssociationMixin<kt_teacher>
  setSl_teacher!: Sequelize.BelongsToSetAssociationMixin<
  kt_teacher,
  kt_teacherId
  >
  createTl_teacher!: Sequelize.BelongsToCreateAssociationMixin<kt_teacher>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_teacherLibrary {
    return kt_teacherLibrary.init(
      {
        kt_tlId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement:true
        },
        tl_teacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tl_bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tl_createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tl_updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_teacherLibrary',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_teacherLibrary_pkey',
            unique: true,
            fields: [{ name: 'tl_teacherId' }, { name: 'tl_bookId' }],
          },
        ],
      },
    )
  }
}
