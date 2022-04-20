import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./products.model";
import { CatsService } from "../cats/cats.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { OptionsService } from "../options/options.service";
import { CreateOptionDto } from "../options/dto/create-option.dto";
import { AddOptionDto } from "../options/dto/add-option.dto";
import { AddCategoryDto } from "../cats/dto/add-category.dto";
import { AddImageDto } from "../images/dto/add-image.dto";
import { ImagesService } from "../images/images.service";
import { Op } from "sequelize";
import { Cat } from "../cats/cats.model";
import { Image } from "../images/images.model";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        private catsService: CatsService,
        private optionsService: OptionsService,
        private imageService: ImagesService,
    ) {}

    async createProduct(createProductDto: CreateProductDto) {
        return this.productRepository.create(createProductDto);
    }

    async getAllProductsFromCategory(catName: string) {
        return this.productRepository.findAll({
            include: [
                {
                    model: Cat,
                    as: "cats",
                    where: { name: catName },
                },
                {
                    all: true,
                },
            ],
        });
    }

    async addCategoryToProduct(addCategoryDto: AddCategoryDto) {
        try {
            let { productId, categoryName } = addCategoryDto;
            const cat = await this.catsService.getCategoryByValue(categoryName);
            const product = await this.productRepository.findOne({
                where: { id: productId },
            });
            return product.$add("cats", cat.id);
        } catch (e) {
            return e.message;
        }
    }

    async addOptionToProduct(addOptionDto: AddOptionDto) {
        try {
            let { productId, title, value } = addOptionDto;
            const product = await this.productRepository.findOne({
                where: { id: productId },
            });
            const option = await this.optionsService.create({ title, value });
            return product.$add("options", option.id);
        } catch (e) {
            return e.message;
        }
    }

    async addImageToProduct(addImageDto: AddImageDto) {
        try {
            let { productId, source } = addImageDto;
            const product = await this.productRepository.findOne({
                where: { id: productId },
            });
            const newImage = await this.imageService.create({ source });
            return product.$add("images", newImage.id);
        } catch (e) {
            return e.message;
        }
    }

    async getAllProducts() {
        return this.productRepository.findAll({ include: { all: true } });
    }

    async getProductById(id: number) {
        return this.productRepository.findOne({ where: { id } });
    }
}
