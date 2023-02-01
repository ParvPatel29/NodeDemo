import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_book, kt_bookId } from './kt_book'
import type { kt_student, kt_studentId } from './kt_student'

export interface kt_reviewAttributes {
  br_id: number
  br_bookId: number
  br_studentId: number
  br_rate: number
  br_comment?: string
  br_createdAt: string
}

export type kt_reviewPk = 'br_id'
export type kt_reviewId = kt_review[kt_reviewPk]
export type kt_reviewOptionalAttributes = 'br_comment' | 'br_createdAt'
export type kt_reviewCreationAttributes = Optional<
  kt_reviewAttributes,
  kt_reviewOptionalAttributes
>

export class kt_review
  extends Model<kt_reviewAttributes, kt_reviewCreationAttributes>
  implements kt_reviewAttributes
{
  br_id!: number
  br_bookId!: number
  br_studentId!: number
  br_rate!: number
  br_comment?: string
  br_createdAt!: string

  // kt_review belongsTo kt_book via br_bookId
  br_book!: kt_book
  getBr_book!: Sequelize.BelongsToGetAssociationMixin<kt_book>
  setBr_book!: Sequelize.BelongsToSetAssociationMixin<kt_book, kt_bookId>
  createBr_book!: Sequelize.BelongsToCreateAssociationMixin<kt_book>
  // kt_review belongsTo kt_student via br_studentId
  br_student!: kt_student
  getBr_student!: Sequelize.BelongsToGetAssociationMixin<kt_student>
  setBr_student!: Sequelize.BelongsToSetAssociationMixin<
    kt_student,
    kt_studentId
  >
  createBr_student!: Sequelize.BelongsToCreateAssociationMixin<kt_student>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_review {
    return kt_review.init(
      {
        br_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        br_bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_book',
            key: 'bk_id',
          },
        },
        br_studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_student',
            key: 'st_id',
          },
        },
        br_rate: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        br_comment: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        br_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_review',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'bk_review_pkey',
            unique: true,
            fields: [{ name: 'br_id' }],
          },
        ],
      },
    )
  }
}
