import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { kt_examTimeTable, kt_examTimeTableId } from './kt_examTimeTable';
import type { kt_school, kt_schoolId } from './kt_school';

export interface kt_examAttributes {
  ex_id: number;
  ex_examTitle: string;
  ex_startDate: string;
  ex_endDate: string;
  ex_totalMarks: number;
  ex_createdAt: string;
  ex_status: boolean;
  ex_schoolId: number;
}

export type kt_examPk = "ex_id";
export type kt_examId = kt_exam[kt_examPk];
export type kt_examOptionalAttributes = "ex_createdAt" | "ex_status";
export type kt_examCreationAttributes = Optional<kt_examAttributes, kt_examOptionalAttributes>;

export class kt_exam extends Model<kt_examAttributes, kt_examCreationAttributes> implements kt_examAttributes {
  ex_id!: number;
  ex_examTitle!: string;
  ex_startDate!: string;
  ex_endDate!: string;
  ex_totalMarks!: number;
  ex_createdAt!: string;
  ex_status!: boolean;
  ex_schoolId!: number;

  // kt_exam hasMany kt_examTimeTable via et_examId
  kt_examTimeTables!: kt_examTimeTable[];
  getKt_examTimeTables!: Sequelize.HasManyGetAssociationsMixin<kt_examTimeTable>;
  setKt_examTimeTables!: Sequelize.HasManySetAssociationsMixin<kt_examTimeTable, kt_examTimeTableId>;
  addKt_examTimeTable!: Sequelize.HasManyAddAssociationMixin<kt_examTimeTable, kt_examTimeTableId>;
  addKt_examTimeTables!: Sequelize.HasManyAddAssociationsMixin<kt_examTimeTable, kt_examTimeTableId>;
  createKt_examTimeTable!: Sequelize.HasManyCreateAssociationMixin<kt_examTimeTable>;
  removeKt_examTimeTable!: Sequelize.HasManyRemoveAssociationMixin<kt_examTimeTable, kt_examTimeTableId>;
  removeKt_examTimeTables!: Sequelize.HasManyRemoveAssociationsMixin<kt_examTimeTable, kt_examTimeTableId>;
  hasKt_examTimeTable!: Sequelize.HasManyHasAssociationMixin<kt_examTimeTable, kt_examTimeTableId>;
  hasKt_examTimeTables!: Sequelize.HasManyHasAssociationsMixin<kt_examTimeTable, kt_examTimeTableId>;
  countKt_examTimeTables!: Sequelize.HasManyCountAssociationsMixin;
  // kt_exam belongsTo kt_school via ex_schoolId
  ex_school!: kt_school;
  getEx_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>;
  setEx_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>;
  createEx_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>;

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_exam {
    return kt_exam.init({
    ex_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ex_examTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ex_startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ex_endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ex_totalMarks: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    ex_createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ex_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    ex_schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kt_school',
        key: 'sc_id'
      }
    }
  }, {
    sequelize,
    tableName: 'kt_exam',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kt_examGenration_pkey",
        unique: true,
        fields: [
          { name: "ex_id" },
        ]
      },
    ]
  });
  }
}
