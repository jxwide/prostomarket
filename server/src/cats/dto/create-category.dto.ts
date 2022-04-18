import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ example: "Смартфоны", description: "Название категории" })
    readonly name: string;

    @ApiProperty({
        example: "cat",
        description: "Категория или список (cat||list)",
    })
    readonly type: string;

    @ApiProperty({
        example: "https://link_to_image.png",
        description: "Ссылка на изображение",
    })
    readonly image: string;

    @ApiProperty({ example: "1", description: "ID род. категории" })
    readonly superCatId: number;
}
