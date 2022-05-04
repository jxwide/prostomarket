import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./products.model";
import {CreateOptionDto} from "../options/dto/create-option.dto";
import {AddOptionDto} from "../options/dto/add-option.dto";
import {AddCategoryDto} from "../cats/dto/add-category.dto";
import {AddImageDto} from "../images/dto/add-image.dto";
import {AdminGuard} from "../users/admin.guard";
import {JwtGuard} from "../users/jwt.guard";
import {SellerGuard} from "../users/seller.guard";
import {UsersDecorator} from "../users/users.decorator";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags("Товары")
@Controller("products")
export class ProductsController {
    constructor(private productsService: ProductsService) {
    }

    @ApiOperation({summary: "Получение всех товаров"})
    @ApiResponse({status: 200, type: [Product]})
    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @ApiOperation({summary: "Получение товара по ID"})
    @ApiResponse({status: 200, type: Product})
    @Get("/:id")
    getProductById(@Param("id") id) {
        return this.productsService.getProductById(id);
    }

    @ApiOperation({summary: "Поиск товаров по категории"})
    @ApiResponse({status: 200, type: [Product]})
    @Get("/cat/:name")
    getAllProductsFromCategory(@Param("name") name) {
        return this.productsService.getAllProductsFromCategory(name);
    }

    @ApiOperation({summary: "Поиск товаров по хар-кам"})
    @ApiResponse({status: 200, type: [Product]})
    @Post("/by/options")
    getProductsByOptions(@Body() options) {
        return this.productsService.getProductsByOptions(options);
    }

    @ApiOperation({summary: "Поиск товаров по названию ( обычный поиск )"})
    @ApiResponse({status: 200, type: [Product]})
    @Get("/q/:query")
    getProductsByTitle(@Param('query') query) {
        return this.productsService.getProductsByTitle(query);
    }

    @ApiOperation({summary: "Создание нового товара"})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(SellerGuard)
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto, @UsersDecorator() userData) {
        return this.productsService.createProduct(createProductDto, userData);
    }

    @ApiOperation({summary: "Добавление новой категории товару"})
    @UseGuards(SellerGuard)
    @Post("/:productId/add/category")
    addCategoryToProduct(
        @Body() addCategoryDto: AddCategoryDto,
        @Param("productId") productId,
        @UsersDecorator('id') userId
    ) {
        const dto = {...addCategoryDto, productId};

        return this.productsService.addCategoryToProduct(dto, userId);
    }

    @ApiOperation({summary: "Добавление новой хар-ки товару"})
    @UseGuards(JwtGuard)
    @Post("/:productId/add/option")
    addOptionToProduct(
        @Body() addOptionDto: AddOptionDto,
        @Param("productId") productId,
    ) {
        const dto = {...addOptionDto, productId};
        return this.productsService.addOptionToProduct(dto);
    }

    @ApiOperation({summary: "Добавление новой картинки к товару"})
    @UseGuards(SellerGuard)
    @Post("/:productId/add/image")
    addImageToProduct(
        @Body() addImageDto: AddImageDto,
        @Param("productId") productId,
        @UsersDecorator('id') userId
    ) {
        const dto = {...addImageDto, productId};
        return this.productsService.addImageToProduct(dto, userId);
    }

    @ApiOperation({summary: "Добавление скидки к товару"})
    @UseGuards(SellerGuard)
    @Post('/:productId/add/sale')
    addSaleToProduct(
        @Param("productId") productId,
        @UsersDecorator("id") userId,
        @Body('newPrice') newPrice
    ) {
        return this.productsService.addSaleToProduct(productId, newPrice, userId)
    }

    @ApiOperation({summary: "Удаление скидки с товара"})
    @UseGuards(SellerGuard)
    @Post('/:productId/remove/sale')
    removeSaleInProduct(
        @Param("productId") productId,
        @UsersDecorator("id") userId
    ) {
        return this.productsService.removeSaleInProduct(productId, userId)
    }
}
