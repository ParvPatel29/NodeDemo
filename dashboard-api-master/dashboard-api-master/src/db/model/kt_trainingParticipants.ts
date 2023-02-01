import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { kt_trainingProgram, kt_trainingProgramId } from './kt_trainingProgram'

export interface kt_trainingParticipantsAttributes {
  tps_id: number;
  tps_tp_id: number;
  tps_userType: string;
  tps_userId?: number;
  tps_status: boolean;
}

export type kt_trainingParticipantsPk = "tps_id";
export type kt_trainingParticipantsId = kt_trainingParticipants[kt_trainingParticipantsPk];
export type kt_trainingParticipantsOptionalAttributes =  "tps_status";
export type kt_trainingParticipantsCreationAttributes = Optional<kt_trainingParticipantsAttributes, kt_trainingParticipantsOptionalAttributes>;

export class kt_trainingParticipants extends Model<kt_trainingParticipantsAttributes, kt_trainingParticipantsCreationAttributes> implements kt_trainingParticipantsAttributes {
  tps_id!: number;
  tps_tp_id!: number;
  tps_userType!: string;
  tps_userId?: number;
  tps_status!: boolean;

  // kt_trainingParticipants belongsTo kt_trainingProgram via tps_trainingProgramId
  tps_trainingProgram!: kt_trainingProgram
  getTpsTrainingProgram!: Sequelize.BelongsToGetAssociationMixin<kt_trainingProgram>
  setTpsTrainingProgram!: Sequelize.BelongsToSetAssociationMixin<
    kt_trainingProgram,
    kt_trainingProgramId
  >
  createTpsTrainingProgram!: Sequelize.BelongsToCreateAssociationMixin<kt_trainingProgram>


  static initModel(sequelize: Sequelize.Sequelize): typeof kt_trainingParticipants {
    return kt_trainingParticipants.init({
    tps_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tps_tp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kt_trainingProgram',
        key: 'tp_id',
      },
    },
    tps_userType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tps_userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    },
    tps_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'kt_trainingParticipants',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kt_trainingParticipants_pkey",
        unique: true,
        fields: [
          { name: "tps_id" },
        ]
      },
      
    ]
  });
  }
}
