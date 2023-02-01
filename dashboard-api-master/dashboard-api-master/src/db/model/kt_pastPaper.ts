import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import {
  kt_assignmentQuestions,
  kt_assignmentQuestionsId,
} from './kt_assignmentQuestions'
import { kt_pastQuestionPaper, kt_pastQuestionPaperId } from './kt_pastQuestionPaper'

export interface kt_pastPaperAttributes {
  pp_id: number
  pp_year: number
  pp_body: string
  pp_title: string
  pp_category?: string
  pp_subCategory?: string
  pp_topic?: string
  pp_totalMarks?:number  
  pp_status: boolean
  pp_createdAt: Date
}

export type kt_pastPaperPk = 'pp_id'
export type kt_pastPaperId = kt_pastPaper[kt_pastPaperPk]
export type kt_pastPaperOptionalAttributes = 'pp_status' | 'pp_createdAt'
export type kt_pastPaperCreationAttributes = Optional<
  kt_pastPaperAttributes,
  kt_pastPaperOptionalAttributes
>

export class kt_pastPaper
  extends Model<kt_pastPaperAttributes, kt_pastPaperCreationAttributes>
  implements kt_pastPaperAttributes
{
  pp_id!: number
  pp_year!: number
  pp_body!: string
  pp_title!: string
  pp_category?: string
  pp_subCategory?: string
  pp_topic?: string
  pp_totalMarks?:number
  pp_status!: boolean
  pp_createdAt!: Date

  // kt_pastPaper hasMany kt_pastQuestionPaper via pp_id
  pp_id_kt_pastQuestionPaper!: kt_pastQuestionPaper[]
  getpp_id_kt_pastQuestionPapers!: Sequelize.HasManyGetAssociationsMixin<kt_pastQuestionPaper>
  setpp_id_kt_pastQuestionPapers!: Sequelize.HasManySetAssociationsMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  addpp_id_kt_pastQuestionPaper!: Sequelize.HasManyAddAssociationMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  addpp_id_kt_pastQuestionPapers!: Sequelize.HasManyAddAssociationsMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  createpp_id_kt_pastQuestionPaper!: Sequelize.HasManyCreateAssociationMixin<kt_pastQuestionPaper>
  removepp_id_kt_pastQuestionPaper!: Sequelize.HasManyRemoveAssociationMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  removepp_id_kt_pastQuestionPapers!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  haspp_id_kt_pastQuestionPaper!: Sequelize.HasManyHasAssociationMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  haspp_id_kt_pastQuestionPapers!: Sequelize.HasManyHasAssociationsMixin<
    kt_pastQuestionPaper,
    kt_pastQuestionPaperId
  >
  countpp_id_kt_pastQuestionPapers!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_pastPaper {
    return kt_pastPaper.init(
      {
        pp_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        pp_year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pp_body: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pp_title: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        
        pp_category: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pp_subCategory: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pp_topic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pp_totalMarks:{
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        pp_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        pp_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_pastPaper',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_pastPaper_pkey',
            unique: true,
            fields: [{ name: 'pp_id' }],
          },
        ],
      },
    )
  }
}
