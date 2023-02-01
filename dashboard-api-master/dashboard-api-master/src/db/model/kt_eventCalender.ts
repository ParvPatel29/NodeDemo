import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_eventCalenderAttributes {
  ec_id: number
  ec_schoolId: number
  ec_class: string
  ec_eventtype: string
  ec_eventDate: Date
  ec_eventTitle: string
  ec_status: boolean
  ec_createdAt: Date
}

export type kt_eventCalenderPk = 'ec_id'
export type kt_eventCalenderId = kt_eventCalender[kt_eventCalenderPk]
export type kt_eventCalenderOptionalAttributes = 'ec_status' | 'ec_createdAt'
export type kt_eventCalenderCreationAttributes = Optional<
  kt_eventCalenderAttributes,
  kt_eventCalenderOptionalAttributes
>

export class kt_eventCalender
  extends Model<kt_eventCalenderAttributes, kt_eventCalenderCreationAttributes>
  implements kt_eventCalenderAttributes
{
  ec_id!: number
  ec_schoolId!: number
  ec_class!: string
  ec_eventtype!: string
  ec_eventDate!: Date
  ec_eventTitle!: string
  ec_status!: boolean
  ec_createdAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_eventCalender {
    return kt_eventCalender.init(
      {
        ec_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ec_schoolId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ec_class: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ec_eventtype: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ec_eventDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ec_eventTitle: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ec_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false, 
          defaultValue: true,
        },
        ec_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_eventCalender',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_eventCalender_pkey',
            unique: true,
            fields: [{ name: 'ec_id' }],
          },
        ],
      },
    )
  }
}
