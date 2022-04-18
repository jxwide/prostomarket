import { ApiProperty } from "@nestjs/swagger";

export class AddOptionDto {
    @ApiProperty({ example: "1", description: "ID товара" })
    readonly productId: number;

    @ApiProperty({ example: "Storage", description: "Название хар-ки" })
    readonly title: string;

    @ApiProperty({ example: "120 gb", description: "Значение" })
    readonly value: string;
}
