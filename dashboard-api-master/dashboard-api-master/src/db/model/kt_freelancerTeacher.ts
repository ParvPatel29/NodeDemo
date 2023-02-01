import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_freelancerTeacherAttributes {
  ft_id: number
  ft_fullName: string
  ft_password: string
  ft_email: string
  ft_education?: string
  ft_region?: string
  ft_district?: string
  ft_circuit?: string
  ft_phoneNumber: string
  ft_altPhoneNumber?: string
  ft_address?: string
  ft_profilePic?: string
  ft_degreeCertificate?: string
  ft_status: boolean
  ft_createdAt: Date
}

export type kt_freelancerTeacherPk = 'ft_id'
export type kt_freelancerTeacherId =
  kt_freelancerTeacher[kt_freelancerTeacherPk]
export type kt_freelancerTeacherOptionalAttributes =
  | 'ft_education'
  | 'ft_region'
  | 'ft_district'
  | 'ft_circuit'
  | 'ft_altPhoneNumber'
  | 'ft_address'
  | 'ft_profilePic'
  | 'ft_degreeCertificate'
  | 'ft_status'
  | 'ft_createdAt'
export type kt_freelancerTeacherCreationAttributes = Optional<
  kt_freelancerTeacherAttributes,
  kt_freelancerTeacherOptionalAttributes
>

export class kt_freelancerTeacher
  extends Model<
    kt_freelancerTeacherAttributes,
    kt_freelancerTeacherCreationAttributes
  >
  implements kt_freelancerTeacherAttributes
{
  ft_id!: number
  ft_fullName!: string
  ft_password!: string
  ft_email!: string
  ft_education?: string
  ft_region?: string
  ft_district?: string
  ft_circuit?: string
  ft_phoneNumber!: string
  ft_altPhoneNumber?: string
  ft_address?: string
  ft_profilePic?: string
  ft_degreeCertificate?: string
  ft_status!: boolean
  ft_createdAt!: Date

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof kt_freelancerTeacher {
    return kt_freelancerTeacher.init(
      {
        ft_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ft_fullName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ft_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ft_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_freelancerTeacher_ft_email_key',
        },
        ft_education: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_region: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_district: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_circuit: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_phoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'kt_freelancerTeacher_ft_phoneNumber_key',
        },
        ft_altPhoneNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: 'kt_freelancerTeacher_ft_altPhoneNumber_key',
        },
        ft_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_profilePic: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_degreeCertificate: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ft_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        ft_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_freelancerTeacher',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_freelancerTeacher_ft_altPhoneNumber_key',
            unique: true,
            fields: [{ name: 'ft_altPhoneNumber' }],
          },
          {
            name: 'kt_freelancerTeacher_ft_email_key',
            unique: true,
            fields: [{ name: 'ft_email' }],
          },
          {
            name: 'kt_freelancerTeacher_ft_phoneNumber_key',
            unique: true,
            fields: [{ name: 'ft_phoneNumber' }],
          },
          {
            name: 'kt_freelancerTeacher_pkey',
            unique: true,
            fields: [{ name: 'ft_id' }],
          },
        ],
      },
    )
  }
}
