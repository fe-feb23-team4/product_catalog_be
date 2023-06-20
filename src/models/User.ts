import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
})

export class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    password: string;

  @Column({
    type: DataType.STRING,
  })
    activationToken: string;
}
