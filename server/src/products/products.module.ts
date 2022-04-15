import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {Cat} from "../cats/cats.model";
import {ProductCats} from "../cats/product-cats.model";
import {CatsModule} from "../cats/cats.module";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([Product, Cat, ProductCats]),
        CatsModule
    ]
})
export class ProductsModule {}
