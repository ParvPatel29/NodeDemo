import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import { kt_trainingParticipants, kt_trainingParticipantsId } from './kt_trainingParticipants'

export interface kt_trainingProgramAttributes {
  tp_id: number
  tp_programTitle: string
  tp_typeOfProgram: string
  tp_description: string
  tp_whoCanAttend: string
  tp_benefitsOfProgram: string
  tp_certificateTemplate: string
  tp_duration: string
  tp_isFree: boolean
  tp_createdAt: Date
  tp_programImage: string
  tp_price?: number
  tp_trainingFor?: string
  tp_whoCanAttendTraining?: string[]
}

export type kt_trainingProgramPk = 'tp_id'
export type kt_trainingProgramId = kt_trainingProgram[kt_trainingProgramPk]
export type kt_trainingProgramOptionalAttributes =
  | 'tp_createdAt'
  | 'tp_price'
  | 'tp_whoCanAttendTraining'
export type kt_trainingProgramCreationAttributes = Optional<
  kt_trainingProgramAttributes,
  kt_trainingProgramOptionalAttributes
>

export class kt_trainingProgram
  extends Model<
    kt_trainingProgramAttributes,
    kt_trainingProgramCreationAttributes
  >
  implements kt_trainingProgramAttributes
{
  tp_id!: number
  tp_programTitle!: string
  tp_typeOfProgram!: string
  tp_description!: string
  tp_whoCanAttend!: string
  tp_benefitsOfProgram!: string
  tp_certificateTemplate!: string
  tp_duration!: string
  tp_isFree!: boolean
  tp_createdAt!: Date
  tp_programImage!: string
  tp_price?: number
  tp_trainingFor!: string
  tp_whoCanAttendTraining?: string[]

  // kt_classRoom hasMany kt_student via st_classRoomId
  kt_trainingParticipantes!: kt_trainingParticipants[]
  getKt_trainingParticipants!: Sequelize.HasManyGetAssociationsMixin<kt_trainingParticipants>
  setKt_trainingParticipants!: Sequelize.HasManySetAssociationsMixin<
    kt_trainingParticipants,
    kt_trainingParticipantsId
  >
  addKt_trainingParticipant!: Sequelize.HasManyAddAssociationMixin<kt_trainingParticipants, kt_trainingParticipantsId>
  addKt_trainingParticipants!: Sequelize.HasManyAddAssociationsMixin<
    kt_trainingParticipants,
    kt_trainingParticipantsId
  >
  createKt_trainingParticipant!: Sequelize.HasManyCreateAssociationMixin<kt_trainingParticipants>
  removeKt_trainingParticipant!: Sequelize.HasManyRemoveAssociationMixin<
    kt_trainingParticipants,
    kt_trainingParticipantsId
  >
  removeKt_trainingParticipants!: Sequelize.HasManyRemoveAssociationsMixin<
    kt_trainingParticipants,
    kt_trainingParticipantsId
  >
  hasKt_trainingParticipant!: Sequelize.HasManyHasAssociationMixin<kt_trainingParticipants, kt_trainingParticipantsId>
  hasKt_trainingParticipants!: Sequelize.HasManyHasAssociationsMixin<
    kt_trainingParticipants,
    kt_trainingParticipantsId
  >
  countKt_trainingParticipants!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_trainingProgram {
    return kt_trainingProgram.init(
      {
        tp_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tp_programTitle: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tp_typeOfProgram: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tp_description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        tp_whoCanAttend: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        tp_benefitsOfProgram: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        tp_certificateTemplate: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tp_duration: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tp_isFree: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        tp_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tp_programImage: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tp_price: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        tp_trainingFor: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tp_whoCanAttendTraining: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'kt_trainingProgram',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_trainingProgram_pkey',
            unique: true,
            fields: [{ name: 'tp_id' }],
          },
        ],
      },
    )
  }
}
