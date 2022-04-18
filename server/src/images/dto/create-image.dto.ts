import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
    @ApiProperty({
        example: "https://link_to_image.png",
        description: "Ссылка на изображение",
    })
    source: string;
}
