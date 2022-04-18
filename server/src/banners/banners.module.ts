import { Module } from "@nestjs/common";
import { BannersController } from "./banners.controller";
import { BannersService } from "./banners.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Banner } from "./banners.model";
import { UsersModule } from "../users/users.module";

@Module({
    controllers: [BannersController],
    providers: [BannersService],
    imports: [SequelizeModule.forFeature([Banner]), UsersModule],
})
export class BannersModule {}
