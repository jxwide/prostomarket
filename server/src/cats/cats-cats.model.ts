import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { Cat } from "./cats.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "cats_cats", createdAt: false, updatedAt: false })
export class CatSubCats extends Model<CatSubCats> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: "1",
        description: "Уникальный идентификатор надкатегории",
    })
    @ForeignKey(() => Cat)
    @Column({ type: DataType.INTEGER })
    superCatId: number;

    @ApiProperty({
        example: "1",
        description: "Уникальный идентификатор подкатегории",
    })
    @ForeignKey(() => Cat)
    @Column({ type: DataType.INTEGER })
    subCatId: number;
}
