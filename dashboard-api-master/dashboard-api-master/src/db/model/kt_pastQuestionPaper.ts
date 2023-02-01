import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_assignment, kt_assignmentId } from './kt_assignment'
import { kt_pastPaper, kt_pastPaperId } from './kt_pastPaper'

export interface kt_pastQuestionPaperAttributes {
  pq_id: number
  pp_id: number
  pq_title : string
  pq_questionStatement: string
  pq_mark: number
  pq_option1?: string
  pq_option2?: string
  pq_option3?: string
  pq_option4?: string
  pq_option5?: string
  pq_text?:string
  pq_image?:string
  pq_correctAns?: string[]
  pq_questionType?: string
  pq_status: boolean
  pq_createdAt: Date
}

export type kt_pastQuestionPaperPk = 'pq_id'
export type kt_pastQuestionPaperId =
  kt_pastQuestionPaper[kt_pastQuestionPaperPk]
export type kt_pastQuestionPaperOptionalAttributes =
  | 'pq_status'
  | 'pq_createdAt'
export type kt_pastQuestionPaperCreationAttributes = Optional<
  kt_pastQuestionPaperAttributes,
  kt_pastQuestionPaperOptionalAttributes
>

export class kt_pastQuestionPaper
  extends Model<
    kt_pastQuestionPaperAttributes,
    kt_pastQuestionPaperCreationAttributes
  >
  implements kt_pastQuestionPaperAttributes
{
  pq_id!: number
  pp_id!: number
  pq_title!:string
  pq_questionStatement!: string
  pq_mark!: number
  pq_option1?: string
  pq_option2?: string
  pq_option3?: string
  pq_option4?: string
  pq_option5?: string
  pq_text?:string
  pq_image?:string
  pq_correctAns?: string[]
  pq_questionType?: string
  pq_status!: boolean
  pq_createdAt!: Date

  // kt_pastQuestionPaper belongsTo kt_pastPaper via pq_assignmentId
  pq_pastPaper!: kt_pastPaper
  getPq_pastPaper!: Sequelize.BelongsToGetAssociationMixin<kt_pastPaper>
  setPq_pastPaper!: Sequelize.BelongsToSetAssociationMixin<
    kt_pastPaper,
    kt_pastPaperId
  >
  createPq_pastPaper!: Sequelize.BelongsToCreateAssociationMixin<kt_pastPaper>

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_pastQuestionPaper {
    return kt_pastQuestionPaper.init(
      {
        pq_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        pp_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_pastPaper',
            key: 'pp_id',
          },
        },
        pq_title:{
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_questionStatement: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_mark: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pq_option1: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pq_option2: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pq_option3: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_option4: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_option5: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_text:{
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_image:{
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_correctAns: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        pq_questionType: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pq_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        pq_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_pastQuestionPaper',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_pastQuestionPaper_pkey',
            unique: true,
            fields: [{ name: 'pq_id' }],
          },
        ],
      },
    )
  }
}
