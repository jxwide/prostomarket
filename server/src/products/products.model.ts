import {
    BelongsToMany,
    Column,
    DataType, ForeignKey,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import { Cat } from "../cats/cats.model";
import { ProductCats } from "../cats/product-cats.model";
import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../images/images.model";
import { Option } from "../options/options.model";
import { User } from "../users/users.model";

interface ProductCreationAttr {
    title: string;
    description: string;
    price: number;
}

@Table({ tableName: "products" })
export class Product extends Model<Product, ProductCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "IPhone 7", description: "Название товара" })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: "...", description: "Описание товара" })
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @ApiProperty({ example: "50000", description: "Цена товара" })
    @Column({ type: DataType.INTEGER, allowNull: true })
    price: string;

    @ApiProperty({ example: "100000", description: "Старая цена товара" })
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    oldprice: string;

    // [cats] [images] [options] [reviews]

    @ApiProperty({ description: "Категории" })
    @BelongsToMany(() => Cat, () => ProductCats)
    cats: [Cat];

    @ApiProperty({ description: "Хар-ки" })
    @HasMany(() => Option)
    options: [Option];

    @ApiProperty({ description: "Изображения" })
    @HasMany(() => Image)
    images: [Image];

    @ApiProperty({ description: "Продавец (ID)" })
    @ForeignKey(() => User)
    ownerId: number;
}
