import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { kt_school, kt_schoolId } from './kt_school'
import type { kt_student, kt_studentId } from './kt_student'

export interface kt_studentAttendanceAttributes {
  sa_id: number
  sa_studentId: number
  sa_createdAt: string
  sa_attendanceData1?: object
  sa_schoolId?: number
  monthYear?: string
  day1?: boolean
  day2?: boolean
  day3?: boolean
  day4?: boolean
  day5?: boolean
  day6?: boolean
  day7?: boolean
  day8?: boolean
  day9?: boolean
  day10?: boolean
  day11?: boolean
  day12?: boolean
  day13?: boolean
  day14?: boolean
  day15?: boolean
  day16?: boolean
  day17?: boolean
  day18?: boolean
  day19?: boolean
  day20?: boolean
  day21?: boolean
  day22?: boolean
  day23?: boolean
  day24?: boolean
  day25?: boolean
  day26?: boolean
  day27?: boolean
  day28?: boolean
  day29?: boolean
  day30?: boolean
  day31?: boolean
}

export type kt_studentAttendancePk = 'sa_id'
export type kt_studentAttendanceId =
  kt_studentAttendance[kt_studentAttendancePk]
export type kt_studentAttendanceOptionalAttributes =
  | 'sa_createdAt'
  | 'sa_attendanceData1'
  | 'sa_schoolId'
  | 'monthYear'
  
  | 'day1'
  | 'day2'
  | 'day3'
  | 'day4'
  | 'day5'
  | 'day6'
  | 'day7'
  | 'day8'
  | 'day9'
  | 'day10'
  | 'day11'
  | 'day12'
  | 'day13'
  | 'day14'
  | 'day15'
  | 'day16'
  | 'day17'
  | 'day18'
  | 'day19'
  | 'day20'
  | 'day21'
  | 'day22'
  | 'day23'
  | 'day24'
  | 'day25'
  | 'day26'
  | 'day27'
  | 'day28'
  | 'day29'
  | 'day30'
  | 'day31'

export type kt_studentAttendanceCreationAttributes = Optional<
  kt_studentAttendanceAttributes,
  kt_studentAttendanceOptionalAttributes
>

export class kt_studentAttendance
  extends Model<
    kt_studentAttendanceAttributes,
    kt_studentAttendanceCreationAttributes
  >
  implements kt_studentAttendanceAttributes
{
  sa_id!: number
  sa_studentId!: number
  sa_createdAt!: string
  sa_attendanceData1?: object
  sa_schoolId?: number
  monthYear?:string
  day1?:boolean
  day2?: boolean
  day3?: boolean
  day4?: boolean
  day5?: boolean
  day6?: boolean
  day7?: boolean
  day8?: boolean
  day9?: boolean
  day10?: boolean
  day11?: boolean
  day12?: boolean
  day13?: boolean
  day14?: boolean
  day15?: boolean
  day16?: boolean
  day17?: boolean
  day18?: boolean
  day19?: boolean
  day20?: boolean
  day21?: boolean
  day22?: boolean
  day23?: boolean
  day24?: boolean
  day25?: boolean
  day26?: boolean
  day27?: boolean
  day28?: boolean
  day29?: boolean
  day30?: boolean
  day31?: boolean
  

  // kt_studentAttendance belongsTo kt_school via sa_schoolId
  sa_school!: kt_school
  getSa_school!: Sequelize.BelongsToGetAssociationMixin<kt_school>
  setSa_school!: Sequelize.BelongsToSetAssociationMixin<kt_school, kt_schoolId>
  createSa_school!: Sequelize.BelongsToCreateAssociationMixin<kt_school>
  // kt_studentAttendance belongsTo kt_student via sa_studentId
  sa_student!: kt_student
  getSa_student!: Sequelize.BelongsToGetAssociationMixin<kt_student>
  setSa_student!: Sequelize.BelongsToSetAssociationMixin<
    kt_student,
    kt_studentId
  >
  createSa_student!: Sequelize.BelongsToCreateAssociationMixin<kt_student>

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_studentAttendance {
    return kt_studentAttendance.init(
      {
        sa_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        sa_studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'kt_student',
            key: 'st_id',
          },
        },
        sa_createdAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        sa_attendanceData1: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        sa_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          onDelete: 'CASCADE',
          references: {
            model: 'kt_school',
            key: 'sc_id',
          },
        },
        monthYear:{
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue:null
        },
        day1: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day2: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day3: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day4: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day5: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day6: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day7: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day8: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day9: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day10: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day11: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day12: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day13: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day14: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day15: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day16: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day17: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day18: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day19: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day20: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day21: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day22: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day23: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day24: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day25: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day26: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day27: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day28: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day29: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day30: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
        day31: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:null
        },
      },
      {
        sequelize,
        tableName: 'kt_studentAttendance',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_studentAttendance_pkey',
            unique: true,
            fields: [{ name: 'sa_id' }],
          },
        ],
      },
    )
  }
}
