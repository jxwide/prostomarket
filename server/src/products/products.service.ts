import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./products.model";
import { CatsService } from "../cats/cats.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { AddNewImageDto } from "../images/dto/add-new-image.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        private catsService: CatsService,
    ) {}

    async createProduct(createProductDto: CreateProductDto) {
        return this.productRepository.create(createProductDto);
    }

    async addCategoryToProduct(catName: string, productId) {
        const cat = await this.catsService.getCategoryByValue(catName);
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        return product.$set("cats", [cat.id]);
    }

    async getAllProducts() {
        return this.productRepository.findAll({ include: { all: true } });
    }

    async getProductById(id: number) {
        return this.productRepository.findOne({ where: { id } });
    }
}
