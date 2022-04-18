import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || "1236zxc17",
            signOptions: { expiresIn: "24h" },
        }),
    ],
    exports: [UsersService, JwtModule],
})
export class UsersModule {}
