import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface BannerCreationAttr {
    title: string;
    href: string;
    type: string;
    image: string;
}

@Table({ tableName: "banners" })
export class Banner extends Model<Banner, BannerCreationAttr> {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: "Текст на баннере",
        description: "Текст на баннере",
    })
    @Column({ type: DataType.STRING, allowNull: true })
    title: string;

    @ApiProperty({ example: "header", description: "Тип баннера" })
    @Column({ type: DataType.STRING, defaultValue: "ad" })
    type: string;

    @ApiProperty({ example: "/sale", description: "Ссылка" })
    @Column({ type: DataType.STRING, allowNull: true })
    href: string;

    @ApiProperty({
        example: "https://image",
        description: "Ссылка на изображение",
    })
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;
}
