import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./products.model";
import { CreateOptionDto } from "../options/dto/create-option.dto";
import { AddOptionDto } from "../options/dto/add-option.dto";
import { AddCategoryDto } from "../cats/dto/add-category.dto";
import { AddImageDto } from "../images/dto/add-image.dto";
import { AdminGuard } from "../users/admin.guard";
import { JwtGuard } from "../users/jwt.guard";

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

    @ApiOperation({ summary: "Получение товара по ID" })
    @ApiResponse({ status: 200, type: Product })
    @Get("/:id")
    getProductById(@Param("id") id) {
        return this.productsService.getProductById(id);
    }

    @Get("/cat/:name")
    getAllProductsFromCategory(@Param("name") name) {
        return this.productsService.getAllProductsFromCategory(name);
    }

    @Post("/by/options")
    getProductsByOptions(@Body() options) {
        return this.productsService.getProductsByOptions(options);
    }

    @ApiOperation({ summary: "Создание нового товара" })
    @ApiResponse({ status: 200, type: Product })
    @UseGuards(AdminGuard)
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
    }

    @ApiOperation({ summary: "Добавление новой категории товару" })
    @UseGuards(JwtGuard)
    @Post("/:productId/add/category")
    addCategoryToProduct(
        @Body() addCategoryDto: AddCategoryDto,
        @Param("productId") productId,
    ) {
        const dto = { ...addCategoryDto, productId };

        return this.productsService.addCategoryToProduct(dto);
    }

    @ApiOperation({ summary: "Добавление новой хар-ки товару" })
    @UseGuards(JwtGuard)
    @Post("/:productId/add/option")
    addOptionToProduct(
        @Body() addOptionDto: AddOptionDto,
        @Param("productId") productId,
    ) {
        const dto = { ...addOptionDto, productId };
        return this.productsService.addOptionToProduct(dto);
    }

    @ApiOperation({ summary: "Добавление новой картинки к товару" })
    @UseGuards(JwtGuard)
    @Post("/:productId/add/image")
    addImageToProduct(
        @Body() addImageDto: AddImageDto,
        @Param("productId") productId,
    ) {
        const dto = { ...addImageDto, productId };
        return this.productsService.addImageToProduct(dto);
    }
}
