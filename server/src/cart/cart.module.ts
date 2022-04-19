import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CartProd } from "./cart.model";
import { User } from "../users/users.model";
import { Product } from "../products/products.model";
import { CartService } from "./cart.service";

@Module({
    providers: [CartService],
    imports: [SequelizeModule.forFeature([CartProd, User, Product])],
    exports: [CartService],
})
export class CartModule {}
