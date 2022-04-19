import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { CartProd } from "../cart/cart.model";

interface UserCreationAttr {
    email: string;
    username: string;
    password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "email@gmail.com", description: "E-mail" })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @ApiProperty({ example: "jxwide", description: "username" })
    @Column({ type: DataType.STRING, allowNull: true, unique: true })
    username: string;

    @ApiProperty({ example: "[HASHED PASSWD]", description: "Hashed password" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: "false", description: "admin ? true : false" })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    admin: boolean;

    // [cart] [orders] [wishlist]

    @HasMany(() => CartProd)
    cart: [CartProd];
}
