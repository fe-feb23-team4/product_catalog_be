import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product';

@Table({
  tableName: 'phones',
  createdAt: false,
  updatedAt: false,
})
export class Phone extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    id: string;

  @HasOne(() => Product)
    product: Product;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    namespaceId: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
  })
    capacityAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    priceRegular: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    priceDiscount: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
  })
    colorsAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
  })
    images: string[];

  @AllowNull(false)
  @Column({
    type: DataTypes.ARRAY(DataTypes.JSON),
  })
    description: string[];

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    resolution: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    processor: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    camera: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    zoom: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
  })
    cell: string[];
}
