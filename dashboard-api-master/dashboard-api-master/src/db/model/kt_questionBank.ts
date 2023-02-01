import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_classRoom, kt_classRoomId } from './kt_classRoom'
import type { kt_school, kt_schoolId } from './kt_school'

export interface kt_questionBankAttributes {
  qb_id: number
  qb_classRoomId: number
  qb_schoolId: number
  qb_subject: string
  qb_questionTitle: string
  qb_option1: string
  qb_option2: string
  qb_option3: string
  qb_option4: string
  qb_correctAnswer: string
  qb_status: boolean
  qb_createdAt: Date
}

export type kt_questionBankPk = 'qb_id'
export type kt_questionBankId = kt_questionBank[kt_questionBankPk]
export type kt_questionBankOptionalAttributes = 'qb_status' | 'qb_createdAt'
export type kt_questionBankCreationAttributes = Optional<
  kt_questionBankAttributes,
  kt_questionBankOptionalAttributes
>

export class kt_questionBank
  extends Model<kt_questionBankAttributes, kt_questionBankCreationAttributes>
  implements kt_questionBankAttributes
{
  qb_id!: number
  qb_classRoomId!: number
  qb_schoolId!: number
  qb_subject!: string
  qb_questionTitle!: string
  qb_option1!: string
  qb_option2!: string
  qb_option3!: string
  qb_option4!: string
  qb_correctAnswer!: string
  qb_status!: boolean
  qb_createdAt!: Date

  // kt_questionBank belongsTo kt_classRoom via qb_classRoomId
  qb_classRoom!: kt_classRoom
  getQb_classRoom!: Sequelize.BelongsToGetAssociationMixin<kt_classRoom>
  setQb_classRoom!: Sequelize.BelongsToSetAssociationMixin<
    kt_classRoom,
    kt_classRoomId
  >
  createQb_classRoom!: Sequelize.BelongsToCreateAssociationMixin<kt_classRoom>
  // kt_questionBank belongsTo kt_school via qb_schoolId
  qb_school!: kt_school
  getQb_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setQb_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createQb_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_questionBank {
    return kt_questionBank.init(
      {
        qb_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        qb_classRoomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_classRoom',
            key: 'cr_id',
          },
        },
        qb_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        qb_subject: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_questionTitle: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_option1: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_option2: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_option3: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_option4: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_correctAnswer: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        qb_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        qb_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_questionBank',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_questionBank_pkey',
            unique: true,
            fields: [{ name: 'qb_id' }],
          },
        ],
      },
    )
  }
}
