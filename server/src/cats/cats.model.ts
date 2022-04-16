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
import { Image } from "../images/images.model";
import { CatSubCats } from "./cats-cats.model";

interface CatCreationAttr {
    name: string;
    type: string;
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

    // [items]

    @BelongsToMany(() => Product, () => ProductCats)
    products: [Product];

    @BelongsToMany(() => Cat, () => CatSubCats)
    subСats: [Cat];
}
