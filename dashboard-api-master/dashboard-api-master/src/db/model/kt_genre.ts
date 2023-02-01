import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface kt_genreAttributes {
  bg_id: number
  bg_genreName: string
  bg_status: boolean
  bg_createdAt: Date
}

export type kt_genrePk = 'bg_id'
export type kt_genreId = kt_genre[kt_genrePk]
export type kt_genreOptionalAttributes = 'bg_status' | 'bg_createdAt'
export type kt_genreCreationAttributes = Optional<
  kt_genreAttributes,
  kt_genreOptionalAttributes
>

export class kt_genre
  extends Model<kt_genreAttributes, kt_genreCreationAttributes>
  implements kt_genreAttributes
{
  bg_id!: number
  bg_genreName!: string
  bg_status!: boolean
  bg_createdAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof kt_genre {
    return kt_genre.init(
      {
        bg_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        bg_genreName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        bg_status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        bg_createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'kt_genre',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'kt_genre_pkey',
            unique: true,
            fields: [{ name: 'bg_id' }],
          },
        ],
      },
    )
  }
}
