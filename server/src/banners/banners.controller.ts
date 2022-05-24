import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {BannersService} from "./banners.service";
import {CreateBannerDto} from "./dto/create-banner.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AdminGuard} from "../users/admin.guard";

@ApiTags("Баннеры")
@Controller("banners")
export class BannersController {
    constructor(private bannerService: BannersService) {
    }

    @ApiOperation({summary: "Получение всех баннеров по типу"})
    @Get("/:type")
    getBannersByType(@Param("type") type: string) {
        return this.bannerService.getBannersByType(type);
    }

    @ApiOperation({summary: "Создание нового баннера"})
    @UseGuards(AdminGuard)
    @Post()
    createNewBanner(@Body() createBannerDto: CreateBannerDto) {
        return this.bannerService.create(createBannerDto);
    }
}
