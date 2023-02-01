import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_book, kt_bookId } from './kt_book'
import type { kt_student, kt_studentId } from './kt_student'

export interface kt_studentLibraryAttributes {
  sl_studentId: number
  sl_bookId: number
  sl_createdAt: string
  sl_updatedAt: string
  kt_slId: number
}

export type kt_studentLibraryPk = 'sl_studentId' | 'sl_bookId' | 'kt_slId'
export type kt_studentLibraryId = kt_studentLibrary[kt_studentLibraryPk]
export type kt_studentLibraryOptionalAttributes =
  | 'sl_createdAt'
  | 'sl_updatedAt'
export type kt_studentLibraryCreationAttributes = Optional<
  kt_studentLibraryAttributes,
  kt_studentLibraryOptionalAttributes
>

export class kt_studentLibrary
  extends Model<
    kt_studentLibraryAttributes,
    kt_studentLibraryCreationAttributes
  >
  implements kt_studentLibraryAttributes
{
  sl_studentId!: number
  kt_slId !:number
  sl_bookId!: number
  sl_createdAt!: string
  sl_updatedAt!: string

  // kt_studentLibrary belongsTo kt_book via sl_bookId
  sl_book!: kt_book
  getSl_book!: Sequelize.BelongsToGetAssociationMixin<kt_book>
  setSl_book!: Sequelize.BelongsToSetAssociationMixin<kt_book, kt_bookId>
  createSl_book!: Sequelize.BelongsToCreateAssociationMixin<kt_book>
  // kt_studentLibrary belongsTo kt_student via sl_studentId
  sl_student!: kt_student
  getSl_student!: Sequelize.BelongsToGetAssociationMixin<kt_student>
  setSl_student!: Sequelize.BelongsToSetAssociationMixin<
    kt_student,
    kt_studentId
  >
  createSl_student!: Sequelize.BelongsToCreateAssociationMixin<kt_student>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_studentLibrary {
    return kt_studentLibrary.init(
      {
        kt_slId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement:true
        },
        sl_studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'kt_student',
            key: 'st_id',
          },
        },
        sl_bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'kt_book',
            key: 'bk_id',
          },
        },
        sl_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        sl_updatedAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },

      },
      {
        sequelize,
        tableName: 'kt_studentLibrary',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_studentLibrary_pkey',
            unique: true,
            fields: [{ name: 'sl_studentId' }, { name: 'sl_bookId' }],
          },
        ],
      },
    )
  }
}
