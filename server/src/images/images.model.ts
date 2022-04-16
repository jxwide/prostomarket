import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ImageCreationAttr {
    source: string;
}

@Table({ tableName: "images" })
export class Image extends Model<Image, ImageCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: "https://link_to_image.png",
        description: "Ссылка на изображение",
    })
    @Column({ type: DataType.STRING, allowNull: false })
    source: string;
}
