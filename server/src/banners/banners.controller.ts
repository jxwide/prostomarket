import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BannersService } from "./banners.service";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Баннеры")
@Controller("banners")
export class BannersController {
    constructor(private bannerService: BannersService) {}

    @ApiOperation({ summary: "Получение всех баннеров по типу" })
    @Get("/:type")
    getBannersByType(@Param("type") type: string) {
        return this.bannerService.getBannersByType(type);
    }

    @ApiOperation({ summary: "СОздание нового баннера" })
    @Post()
    createNewBanner(@Body() createBannerDto: CreateBannerDto) {
        return this.bannerService.create(createBannerDto);
    }
}
