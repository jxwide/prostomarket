import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Cat} from "./cats.model";
import {Product} from "../products/products.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'product_cats', createdAt: false, updatedAt: false})
export class ProductCats extends Model<ProductCats> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '2', description: 'Уникальный идентификатор категории'})
    @ForeignKey(() => Cat)
    @Column({type: DataType.INTEGER})
    catId: number;

    @ApiProperty({example: '3', description: 'Уникальный идентификатор товара'})
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
}