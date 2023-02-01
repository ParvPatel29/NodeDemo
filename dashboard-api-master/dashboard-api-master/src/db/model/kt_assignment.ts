import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import {
  kt_assignmentQuestions,
  kt_assignmentQuestionsId,
} from './kt_assignmentQuestions'

export interface kt_assignmentAttributes {
  asn_id: number
  tc_id: number
  asn_title: string
  asn_desc: string
  asn_totalMarks: number
  asn_duration?: string
  asn_markPerQue?: number
  asn_mainCategory?: string
  asn_category: string
  asn_subCategory?: string
  asn_topic?: string
  asn_isDateRange?: boolean
  asn_startDate?: string
  asn_endDate?: string
  asn_passingMarks?: number
  asn_questionSetType?: string
  asn_status: boolean
  asn_createdAt: Date
}

export type kt_assignmentPk = 'asn_id'
export type kt_assignmentId = kt_assignment[kt_assignmentPk]
export type kt_assignmentOptionalAttributes = 'asn_status' | 'asn_createdAt'
export type kt_assignmentCreationAttributes = Optional<
  kt_assignmentAttributes,
  kt_assignmentOptionalAttributes
>

export class kt_assignment
  extends Model<kt_assignmentAttributes, kt_assignmentCreationAttributes>
  implements kt_assignmentAttributes
{
  asn_id!: number
  tc_id!: number
  asn_title!: string
  asn_desc!: string
  asn_totalMarks!: number
  asn_duration?: string
  asn_markPerQue?: number
  asn_mainCategory?: string
  asn_category!: string
  asn_subCategory?: string
  asn_topic?: string
  asn_isDateRange?: boolean
  asn_startDate?: string
  asn_endDate?: string
  asn_passingMarks?: number
  asn_questionSetType?: string
  asn_status!: boolean
  asn_createdAt!: Date

  // kt_classRoom hasMany kt_student via st_classRoomId
  kt_assignmentQuestions!: kt_assignmentQuestions[]
  getKt_assignmentQuestions!: Sequelize.HasManyGetAssociationsMixin<kt_assignmentQuestions>
  setKt_assignmentQuestions!: Sequelize.HasManySetAssociationsMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  addKt_assignmentQuestion!: Sequelize.HasManyAddAssociationMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  addKt_assignmentQuestions!: Sequelize.HasManyAddAssociationsMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  createKt_assignmentQuestion!: Sequelize.HasManyCreateAssociationMixin<kt_assignmentQuestions>
  removeKt_assignmentQuestion!: Sequelize.HasManyRemoveAssociationMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  removeKt_assignmentQuestions!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  hasKt_assignmentQuestion!: Sequelize.HasManyHasAssociationMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  hasKt_assignmentQuestions!: Sequelize.HasManyHasAssociationsMixin<
    kt_assignmentQuestions,
    kt_assignmentQuestionsId
  >
  countKt_assignmentQuestions!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_assignment {
    return kt_assignment.init(
      {
        asn_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tc_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        asn_title: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_desc: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_totalMarks: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        asn_duration: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_markPerQue: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        asn_mainCategory: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_category: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_subCategory: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_topic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_isDateRange: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        asn_startDate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_endDate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_passingMarks: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        asn_questionSetType: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        asn_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        asn_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_assignment',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_assignment_pkey',
            unique: true,
            fields: [{ name: 'asn_id' }],
          },
        ],
      },
    )
  }
}
