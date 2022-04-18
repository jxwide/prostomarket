import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./images.model";
import { Product } from "../products/products.model";
import { Cat } from "../cats/cats.model";
import { CatsModule } from "../cats/cats.module";

@Module({
    providers: [ImagesService],
    controllers: [],
    imports: [SequelizeModule.forFeature([Image, Product, Cat]), CatsModule],
    exports: [ImagesService],
})
export class ImagesModule {}
