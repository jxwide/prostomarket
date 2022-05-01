import { forwardRef, Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./products.model";
import { Cat } from "../cats/cats.model";
import { ProductCats } from "../cats/product-cats.model";
import { CatsModule } from "../cats/cats.module";
import { Option } from "../options/options.model";
import { OptionsModule } from "../options/options.module";
import { ImagesModule } from "../images/images.module";
import { UsersModule } from "../users/users.module";
import { CartProd } from "../cart/cart.model";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([
            Product,
            Cat,
            ProductCats,
            Option,
            CartProd,
            User
        ]),
        CatsModule,
        OptionsModule,
        ImagesModule,
        UsersModule
    ],
    exports: [ProductsService],
})
export class ProductsModule {}
