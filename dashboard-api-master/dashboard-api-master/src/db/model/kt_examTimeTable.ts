import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { kt_classRoom, kt_classRoomId } from './kt_classRoom';
import type { kt_exam, kt_examId } from './kt_exam';
import type { kt_school, kt_schoolId } from './kt_school';

export interface kt_examTimeTableAttributes {
  et_id: number;
  et_examId: number;
  et_date?: string;
  et_classId: string;
  et_subject: string;
  et_marks?: number;
  et_oldExamPaper?: string;
  et_createdAt: string;
  et_status: boolean;
  et_schoolId: number;
}

export type kt_examTimeTablePk = "et_id";
export type kt_examTimeTableId = kt_examTimeTable[kt_examTimeTablePk];
export type kt_examTimeTableOptionalAttributes = "et_date" | "et_marks" | "et_oldExamPaper" | "et_createdAt" | "et_status";
export type kt_examTimeTableCreationAttributes = Optional<kt_examTimeTableAttributes, kt_examTimeTableOptionalAttributes>;

export class kt_examTimeTable extends Model<kt_examTimeTableAttributes, kt_examTimeTableCreationAttributes> implements kt_examTimeTableAttributes {
  et_id!: number;
  et_examId!: number;
  et_date?: string;
  et_classId!: string;
  et_subject!: string;
  et_marks?: number;
  et_oldExamPaper?: string;
  et_createdAt!: string;
  et_status!: boolean;
  et_schoolId!: number;

  // kt_examTimeTable belongsTo kt_classRoom via et_classId
  // et_class!: kt_classRoom;
  // getEt_class!: Sequelize.BelongsToGetAssociationMixin<kt_classRoom>;
  // setEt_class!: Sequelize.BelongsToSetAssociationMixin<kt_classRoom, kt_classRoomId>;
  // createEt_class!: Sequelize.BelongsToCreateAssociationMixin<kt_classRoom>;
  // kt_examTimeTable belongsTo kt_exam via et_examId
  et_exam!: kt_exam;
  getEt_exam!: Sequelize.BelongsToGetAssociationMixin<kt_exam>;
  setEt_exam!: Sequelize.BelongsToSetAssociationMixin<kt_exam, kt_examId>;
  createEt_exam!: Sequelize.BelongsToCreateAssociationMixin<kt_exam>;
  // kt_examTimeTable belongsTo kt_school via et_schoolId
  et_school!: kt_school;
  getEt_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>;
  setEt_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>;
  createEt_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>;

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_examTimeTable {
    return kt_examTimeTable.init({
    et_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    et_examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kt_exam',
        key: 'ex_id'
      }
    },
    et_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    et_classId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // references: {
      //   model: 'kt_classRoom',
      //   key: 'cr_id'
      // }
    },
    et_subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    et_marks: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    et_oldExamPaper: {
      type: DataTypes.STRING,
      allowNull: true
    },
    et_createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    et_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    et_schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kt_school',
        key: 'sc_id'
      }
    }
  }, {
    sequelize,
    tableName: 'kt_examTimeTable',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kt_examTimeTable_pkey",
        unique: true,
        fields: [
          { name: "et_id" },
        ]
      },
    ]
  });
  }
}
