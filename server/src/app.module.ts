import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Cat } from "./cats/cats.model";
import { Product } from "./products/products.model";
import { ProductCats } from "./cats/product-cats.model";
import { Image } from "./images/images.model";
import { CatsModule } from "./cats/cats.module";
import { ProductsModule } from "./products/products.module";
import { ImagesModule } from "./images/images.module";
import { BannersModule } from "./banners/banners.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            database: process.env.POSTGRES_DB,
            models: [Cat, Product, ProductCats, Image],
            autoLoadModels: true,
        }),
        CatsModule,
        ProductsModule,
        ImagesModule,
        BannersModule,
    ],
})
export class AppModule {}
