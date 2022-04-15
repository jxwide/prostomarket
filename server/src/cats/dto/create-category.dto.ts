import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({example: 'Смартфоны', description: 'Название категории'})
    readonly name: string;

    @ApiProperty({example: 'cat', description: 'Категория или список (cat||list)'})
    readonly type: string;
}