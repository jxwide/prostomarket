import { Module } from "@nestjs/common";
import { OptionsController } from "./options.controller";
import { OptionsService } from "./options.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Option } from "./options.model";
import { Product } from "../products/products.model";

@Module({
    controllers: [OptionsController],
    providers: [OptionsService],
    imports: [SequelizeModule.forFeature([Option, Product])],
    exports: [OptionsService],
})
export class OptionsModule {}
