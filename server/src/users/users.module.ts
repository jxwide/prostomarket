import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { JwtModule } from "@nestjs/jwt";
import { CartProd } from "../cart/cart.model";
import { CartModule } from "../cart/cart.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, CartProd]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || "1236zxc17",
            signOptions: { expiresIn: "24h" },
        }),
        CartModule,
    ],
    exports: [UsersService, JwtModule],
})
export class UsersModule {}
