import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({example: 'IPhone 7', description: 'Название товара'})
    readonly title: string;

    @ApiProperty({example: '...', description: 'Описание товара'})
    readonly description: string;

    @ApiProperty({example: '100000', description: 'Цена товара'})
    readonly price: number;
}