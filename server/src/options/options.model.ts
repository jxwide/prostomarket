import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import { Cat } from "../cats/cats.model";
import { ProductCats } from "../cats/product-cats.model";
import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../images/images.model";
import { Product } from "../products/products.model";

interface OptionCreationAttr {
    title: string;
    value: string;
}

@Table({ tableName: "options" })
export class Option extends Model<Option, OptionCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "Storage", description: "Название хар-ки" })
    @Column({ type: DataType.STRING, allowNull: false, unique: false })
    title: string;

    @ApiProperty({ example: "120 gb", description: "Значение" })
    @Column({ type: DataType.STRING, allowNull: false })
    value: string;

    @ApiProperty({ description: "ID продукта" })
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;
}
