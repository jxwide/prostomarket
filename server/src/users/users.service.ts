import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import { AddProductToCartDto } from "./dto/add-product-to-cart.dto";
import { CartService } from "../cart/cart.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private jwtService: JwtService,
        private cartService: CartService,
    ) {}

    async registration(createUserDto: CreateUserDto) {
        try {
            let { password } = createUserDto;
            const hash = await bcrypt.hash(password, 3);
            let payload = { ...createUserDto, password: hash };
            const user = await this.userRepository.create(payload);
            return this.jwtService.sign(user["dataValues"]);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        try {
            let { password, email } = loginUserDto;
            let user = await this.userRepository.findOne({ where: { email } });
            let passwordHashed = user["dataValues"].password;
            const isMatch = await bcrypt.compare(password, passwordHashed);
            if (isMatch) {
                return this.jwtService.sign(user["dataValues"]);
            } else {
                throw new Error("Пароль неверный!");
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async addProductToCart(addProductToCartDto: AddProductToCartDto) {
        try {
            let { productId } = addProductToCartDto;
            let cartProd = await this.cartService.create(productId);

            let user = await this.userRepository.findOne({
                where: { id: addProductToCartDto.userId },
            });
            return user.$add("cart", cartProd.id);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserCart(id: number) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                include: { all: true },
            });
            return user["dataValues"].cart;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async test() {
        return this.userRepository.findAll({ include: { all: true } });
    }
}
