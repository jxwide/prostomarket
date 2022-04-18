import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {
    @ApiProperty({ description: "Текст на баннере" })
    readonly title: string;

    @ApiProperty({ description: "Ссылка" })
    readonly href: string;

    @ApiProperty({ description: "Тип баннера" })
    readonly type: string;

    @ApiProperty({ description: "Изображение" })
    readonly image: string;
}
