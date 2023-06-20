import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'tokens',
  createdAt: false,
  updatedAt: false,
})

export class Token extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    refreshToken: string;
}

Token.belongsTo(User);
User.hasOne(Token);
