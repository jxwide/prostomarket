import { ApiProperty } from "@nestjs/swagger";

export class AddImageDto {
    @ApiProperty({
        example: "https://link_to_image.png",
        description: "Ссылка на изображение",
    })
    readonly source: string;

    @ApiProperty({ description: "ID продукта" })
    readonly productId: number;
}
