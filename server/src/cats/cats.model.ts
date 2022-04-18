import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import { Product } from "../products/products.model";
import { ProductCats } from "./product-cats.model";
import { ApiProperty } from "@nestjs/swagger";

interface CatCreationAttr {
    name: string;
    type: string;
    image: string;
}

@Table({ tableName: "categories" })
export class Cat extends Model<Cat, CatCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "Смартфоны", description: "Название категории" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({
        example: "cat",
        description: "Категория или список (cat||list)",
    })
    @Column({ type: DataType.STRING, defaultValue: "cat" })
    type: string;

    @ApiProperty({
        example: "https://image",
        description: "Ссылка на изображение",
    })
    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @ApiProperty({
        example: "3",
        description: "ID род. категории",
    })
    @Column({ type: DataType.INTEGER, allowNull: true })
    superCatId: number;

    @ApiProperty({
        example: "[Product] (array)",
        description: "Все товары в категории",
    })
    @BelongsToMany(() => Product, () => ProductCats)
    products: [Product];
}
