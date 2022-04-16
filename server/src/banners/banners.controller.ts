import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BannersService } from "./banners.service";
import { CreateBannerDto } from "./dto/create-banner.dto";

@Controller("banners")
export class BannersController {
    constructor(private bannerService: BannersService) {}

    @Get("/:type")
    getBannersByType(@Param("type") type: string) {
        return this.bannerService.getBannersByType(type);
    }

    @Post()
    createNewBanner(@Body() createBannerDto: CreateBannerDto) {
        return this.bannerService.create(createBannerDto);
    }
}
