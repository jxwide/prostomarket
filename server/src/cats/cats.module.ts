import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Cat } from "./cats.model";
import { Product } from "../products/products.model";
import { ProductCats } from "./product-cats.model";
import { Image } from "../images/images.model";

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    imports: [SequelizeModule.forFeature([Cat, Product, ProductCats, Image])],
    exports: [CatsService],
})
export class CatsModule {}
