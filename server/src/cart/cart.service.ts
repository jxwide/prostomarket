import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CartProd } from "./cart.model";

@Injectable()
export class CartService {
    constructor(
        @InjectModel(CartProd) private cartRepository: typeof CartProd,
    ) {}

    async create(productId: number) {
        return this.cartRepository.create({ productId });
    }
}
