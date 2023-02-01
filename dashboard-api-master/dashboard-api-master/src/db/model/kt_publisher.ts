import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_publisherAttributes {
  pb_id : number
  pb_fullName  : string
  pb_password: string
  pb_email  : string
  pb_education?: string
  pb_region?: string
  pb_district?: string
  pb_circuit?: string
  pb_phoneNumber: string
  pb_altPhoneNumber?: string
  pb_address?: string
  pb_profilePic?: string
  pb_degreeCertificate?: string
  pb_status: boolean
  pb_createdAt: Date
}

export type kt_publisherId = 'pb_id'
export type kt_parentId =
  kt_publisher[kt_publisherId]
export type kt_publisherOptionalAttributes =
  | 'pb_education'
  | 'pb_region'
  | 'pb_district'
  | 'pb_circuit'
  | 'pb_altPhoneNumber'
  | 'pb_address'
  | 'pb_profilePic'
  | 'pb_degreeCertificate'
  | 'pb_status'
  | 'pb_createdAt'
export type kt_publisherCreationAttributes = Optional<
  kt_publisherAttributes,
  kt_publisherOptionalAttributes
>

export class kt_publisher
  extends Model<
    kt_publisherAttributes,
    kt_publisherCreationAttributes
  >
  implements kt_publisherAttributes
{
  pb_id !: number
  pb_fullName  !: string
  pb_password!: string
  pb_email  !: string
  pb_education?: string
  pb_region?: string
  pb_district?: string
  pb_circuit?: string
  pb_phoneNumber!: string
  pb_altPhoneNumber?: string
  pb_address?: string
  pb_profilePic?: string
  pb_degreeCertificate?: string
  pb_status!: boolean
  pb_createdAt!: Date

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_publisher {
    return kt_publisher.init(
      {
        pb_id : {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        pb_fullName  : {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pb_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pb_email  : {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_publisher_pt_email_key',
        },
        pb_education: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_region: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_publisher_pb_phoneNumber_key',
        },
        pb_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_publisher_pb_altPhoneNumber_key',
        },
        pb_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_profilePic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_degreeCertificate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pb_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        pb_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_publisher',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_publisher_pb_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'pb_altPhoneNumber' }],
          },
          {
            name: 'kt_publisher_pb_email_key',
            unique: true,
            fields: [{ name: 'pb_email' }],
          },
          {
            name: 'kt_publisher_pb_phoneNumber_key',
            unique: true,
            fields: [{ name: 'pb_phoneNumber' }],
          },
          {
            name: 'kt_publisher_pkey',
            unique: true,
            fields: [{ name: 'pb_id ' }],
          },
        ],
      },
    )
  }
}
