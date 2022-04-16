import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./images.model";
import { Product } from "../products/products.model";
import { Cat } from "../cats/cats.model";
import { CatsModule } from "../cats/cats.module";
import { ProductsModule } from "../products/products.module";

@Module({
    providers: [ImagesService],
    controllers: [ImagesController],
    imports: [
        SequelizeModule.forFeature([Image, Product, Cat]),
        CatsModule,
        ProductsModule,
    ],
})
export class ImagesModule {}
