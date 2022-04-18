import { Module } from "@nestjs/common";
import { BannersController } from "./banners.controller";
import { BannersService } from "./banners.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Banner } from "./banners.model";

@Module({
    controllers: [BannersController],
    providers: [BannersService],
    imports: [SequelizeModule.forFeature([Banner])],
})
export class BannersModule {}
