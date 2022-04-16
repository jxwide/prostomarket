import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CatsModule } from "./cats/cats.module";
import { ProductsModule } from "./products/products.module";
import { Cat } from "./cats/cats.model";
import { Product } from "./products/products.model";
import { ProductCats } from "./cats/product-cats.model";
import { ImagesModule } from "./images/images.module";
import { Image } from "./images/images.model";

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
    ],
})
export class AppModule {}
