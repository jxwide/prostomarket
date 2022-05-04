import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class AddImageDto {
    @ApiProperty({
        example: "https://link_to_image.png",
        description: "Ссылка на изображение",
    })
    @IsString({message: "Ссылка должена быть строкой!"})
    @Length(5, 32, {message: "Ссылка должена быть от 5 до 32 символов!"})
    readonly source: string;

    @ApiProperty({description: "ID продукта"})
    readonly productId: number;
}
