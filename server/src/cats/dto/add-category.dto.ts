import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class AddCategoryDto {
    @ApiProperty({description: "ID продукта"})
    productId: number;

    @ApiProperty({description: "Название категории"})
    @IsString({message: "Название должено быть строкой!"})
    @Length(3, 32, {message: "Название должено быть от 3 до 32 символов!"})
    categoryName: string;
}
