import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_assignment, kt_assignmentId } from './kt_assignment'

export interface kt_assignmentQuestionsAttributes {
  aq_id: number
  asn_id  : number
  tc_id  : number
  aq_title: string
  aq_answerType  : string
  aq_option1?: string
  aq_option2?: string
  aq_option3?: string
  aq_option4?: string
  aq_option5?: string
  aq_correntAns?: string[]
  aq_mark?: string
  aq_status: boolean
  aq_createdAt: Date
}

export type kt_assignmentQuestionsPk = 'aq_id'
export type kt_assignmentQuestionsId =
  kt_assignmentQuestions[kt_assignmentQuestionsPk]
export type kt_assignmentQuestionsOptionalAttributes =
  | 'aq_status'
  | 'aq_createdAt'
export type kt_assignmentQuestionsCreationAttributes = Optional<
  kt_assignmentQuestionsAttributes,
  kt_assignmentQuestionsOptionalAttributes
>

export class kt_assignmentQuestions
  extends Model<
    kt_assignmentQuestionsAttributes,
    kt_assignmentQuestionsCreationAttributes
  >
  implements kt_assignmentQuestionsAttributes
{
  aq_id!: number
  asn_id!: number
  tc_id!:number
  aq_title!: string
  aq_answerType  !: string
  aq_option1?: string
  aq_option2?: string
  aq_option3?: string
  aq_option4?: string
  aq_option5?: string
  aq_correntAns?: string[]
  aq_mark?: string
  aq_status!: boolean
  aq_createdAt!: Date

  // kt_assignmentQuestions belongsTo kt_assignment via aq_assignmentId
  aq_assignment!: kt_assignment
  getAqTrainingProgram!: Sequelize.BelongsToGetAssociationMixin<kt_assignment>
  setAqTrainingProgram!: Sequelize.BelongsToSetAssociationMixin<
    kt_assignment,
    kt_assignmentId
  >
  createAqTrainingProgram!: Sequelize.BelongsToCreateAssociationMixin<kt_assignment>

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_assignmentQuestions {
    return kt_assignmentQuestions.init(
      {
        aq_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        asn_id  : {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'kt_assignment',
            key: 'asn_id',
          },
        },
        tc_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        aq_title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        aq_answerType  : {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        aq_option1: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        aq_option2: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        aq_option3: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        aq_option4 : {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        aq_option5 : {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        aq_correntAns  : {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        aq_mark: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        aq_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        aq_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_assignmentQuestions',
        schema: 'public',
        timestamps: false,
        indexes: [
          
          {
            name: 'kt_assignmentQuestions_pkey',
            unique: true,
            fields: [{ name: 'aq_id' }],
          },
        ],
      },
    )
  }
}
