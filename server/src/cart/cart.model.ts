import {
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../products/products.model";
import { User } from "../users/users.model";
import { INTEGER } from "sequelize";

interface CartProdCreationAttr {
    productId: number;
}

@Table({ tableName: "cart" })
export class CartProd extends Model<CartProd, CartProdCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.INTEGER })
    productId: Product;

    @ForeignKey(() => User)
    userId: number;
}
