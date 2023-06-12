import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Phone } from './Phone';

@Table({
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
})
export class Product extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    id: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    category: string;

  @ForeignKey(() => Phone)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

  @BelongsTo(() => Phone)
    phone: Phone | null;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    itemId: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    fullPrice: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    price: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    year: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    image: string;
}
