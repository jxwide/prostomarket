import { ApiProperty } from "@nestjs/swagger";

export class AddCategoryDto {
    @ApiProperty({ description: "ID продукта" })
    productId: number;

    @ApiProperty({ description: "Название категории" })
    categoryName: string;
}
