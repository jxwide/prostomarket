import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

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
}
