import {forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {CatsService} from "../cats/cats.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {OptionsService} from "../options/options.service";
import {CreateOptionDto} from "../options/dto/create-option.dto";
import {AddOptionDto} from "../options/dto/add-option.dto";
import {AddCategoryDto} from "../cats/dto/add-category.dto";
import {AddImageDto} from "../images/dto/add-image.dto";
import {ImagesService} from "../images/images.service";
import {Op} from "sequelize";
import {Cat} from "../cats/cats.model";
import {Image} from "../images/images.model";
import {Option} from "../options/options.model";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        private catsService: CatsService,
        private optionsService: OptionsService,
        private imageService: ImagesService,
        private usersService: UsersService
    ) {
    }

    async createProduct(createProductDto: CreateProductDto, userData) {
        let product = await this.productRepository.create(createProductDto)
        console.log(product)
        if (createProductDto.ownerId) {
            let result = this.usersService.addProduct(product['dataValues'].id, userData)
        }
        return product;
    }

    async getAllProductsFromCategory(catName: string) {
        return this.productRepository.findAll({
            include: [
                {
                    model: Cat,
                    as: "cats",
                    where: {name: catName},
                },
                {
                    all: true,
                },
            ],
        });
    }

    async addCategoryToProduct(addCategoryDto: AddCategoryDto, userId) {
        try {
            let {productId, categoryName} = addCategoryDto;
            const cat = await this.catsService.getCategoryByValue(categoryName);
            const product = await this.productRepository.findOne({
                where: {id: productId},
                include: {all: true}
            });
            if (product['dataValues'].ownerId != userId) return new Error('Нет доступа')
            return product.$add("cats", cat.id);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async addOptionToProduct(addOptionDto: AddOptionDto) {
        try {
            let {productId, title, value} = addOptionDto;
            const product = await this.productRepository.findOne({
                where: {id: productId},
            });
            const option = await this.optionsService.create({title, value});
            return product.$add("options", option.id);
        } catch (e) {
            return e.message;
        }
    }

    async addImageToProduct(addImageDto: AddImageDto, userId) {
        try {
            let {productId, source} = addImageDto;
            const product = await this.productRepository.findOne({
                where: {id: productId},
            });
            if (product['dataValues'].ownerId != userId) return new Error('Нет доступа')
            const newImage = await this.imageService.create({source});
            return product.$add("images", newImage.id);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async addSaleToProduct(productId: number, newPrice: number, userId: number) {
        try {
            let product = await this.productRepository.findOne({where: {ownerId: userId, id: productId}})
            if (!product['dataValues']) throw new Error('Нет доступа')
            let oldPrice = product['dataValues'].price;
            return this.productRepository.update({price: newPrice, oldprice: oldPrice}, {where: {id: productId}})
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async removeSaleInProduct(productId: number, userId: number) {
        try {
            let product = await this.productRepository.findOne({where: {ownerId: userId, id: productId}})
            if (!product['dataValues']) throw new Error('Нет доступа')
            let oldPrice = product['dataValues'].oldprice;
            return this.productRepository.update({price: oldPrice, oldprice: 0}, {where: {id: productId}})
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllProducts() {
        return this.productRepository.findAll({include: {all: true}});
    }

    async getProductById(id: number) {
        return this.productRepository.findOne({
            where: {id},
            include: {all: true},
        });
    }

    async getProductsByOptions(options) {
        let result = [];
        for (let i = 0; i < options.length; i++) {
            let products = await this.productRepository.findAll({
                include: [
                    {
                        model: Option,
                        as: "options",
                        where: {
                            title: {
                                [Op.iLike]: options[i].title + '%'
                            },
                            value: {
                                [Op.iLike]: '%' + options[i].value + '%',
                            },
                        },
                    },
                    {all: true},
                ],
            });
            result = [...result, ...products];
        }
        return result;
    }

    async getProductsByTitle(query) {
        let words = query.split(' ')
        let products = await this.productRepository.findAll({
            where: {
                title: {
                    [Op.iRegexp]: `${words.join('|')}`
                }
            },
            include: {all: true}
        })

        // sort by first word
        products.sort((a, b) => {
            if (a.title.includes(words[0])) return -1;
            if (b.title.includes(words[0])) return 1;
            return 0;
        })
        return products
    }
}
