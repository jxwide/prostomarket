import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { JwtGuard } from "./jwt.guard";
import { UsersDecorator } from "./users.decorator";
import { SellerGuard } from "./seller.guard";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UsePipes(ValidationPipe)
    @Post("/auth/singup")
    registration(@Body() createUserDto: CreateUserDto) {
        return this.usersService.registration(createUserDto);
    }

    @UsePipes(ValidationPipe)
    @Post("/auth/login")
    login(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.login(loginUserDto);
    }

    @UseGuards(JwtGuard)
    @Get("/cart/add/product/:productId")
    addProductToCart(
        @UsersDecorator("id") userId,
        @Param("productId") productId,
    ) {
        if (!userId || !productId) return false;
        return this.usersService.addProductToCart({ productId, userId });
    }

    @UseGuards(JwtGuard)
    @Get("/cart")
    getUserCart(@UsersDecorator("id") userId) {
        return this.usersService.getUserCart(parseInt(userId));
    }

    @UseGuards(SellerGuard)
    @Get('/products')
    getUserProducts(@UsersDecorator('id') id) {
        return this.usersService.getUserProducts(parseInt(id))
    }

    @Get("/users")
    test() {
        return this.usersService.test();
    }
}
