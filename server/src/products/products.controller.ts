import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./products.model";

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({summary: 'Получение всех товаров'})
    @ApiResponse({status: 200, type: [Product]})
    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts()
    }

    @ApiOperation({summary: 'Создание нового товара'})
    @ApiResponse({status: 200, type: Product})
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto)
    }

    @ApiOperation({summary: 'Добавление новой категории товару'})
    @Get('/product/:productId/add/category/:categoryName')
    addCategoryToProduct(@Param() params) {
        return this.productsService.addCategoryToProduct(params.categoryName, parseInt(params.productId))
    }
}
