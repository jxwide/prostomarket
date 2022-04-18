import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./products.model";
import { CreateOptionDto } from "../options/dto/create-option.dto";
import { AddOptionDto } from "../options/dto/add-option.dto";
import { AddCategoryDto } from "../cats/dto/add-category.dto";

@ApiTags("Товары")
@Controller("products")
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({ summary: "Получение всех товаров" })
    @ApiResponse({ status: 200, type: [Product] })
    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @ApiOperation({ summary: "Создание нового товара" })
    @ApiResponse({ status: 200, type: Product })
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
    }

    @ApiOperation({ summary: "Добавление новой категории товару" })
    @Get("/:productId/add/category")
    addCategoryToProduct(
        @Body() addCategoryDto: AddCategoryDto,
        @Param("productId") productId,
    ) {
        const dto = { ...addCategoryDto, productId };

        return this.productsService.addCategoryToProduct(dto);
    }

    @ApiOperation({ summary: "Добавление новой категории товару" })
    @Post("/:productId/add/option")
    addOptionToProduct(
        @Body() addOptionDto: AddOptionDto,
        @Param("productId") productId,
    ) {
        const dto = { ...addOptionDto, productId };
        return this.productsService.addOptionToProduct(dto);
    }
}
