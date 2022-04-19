import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Cat } from "./cats.model";
import { AdminGuard } from "../users/admin.guard";

@ApiTags("Категории")
@Controller("cats")
export class CatsController {
    constructor(private catsService: CatsService) {}

    @ApiOperation({ summary: "Создание новой категории" })
    @ApiResponse({ status: 200, type: Cat })
    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.catsService.createCategory(createCategoryDto);
    }

    @ApiOperation({ summary: "Получение категории по ее названию" })
    @ApiResponse({ status: 200, type: Cat })
    @Get("/:value")
    getCategoryByValue(@Param("value") value: string) {
        return this.catsService.getCategoryByValue(value);
    }

    @ApiOperation({ summary: "Получение всех категорий" })
    @ApiResponse({ status: 200, type: [Cat] })
    @Get()
    getAllCategories() {
        return this.catsService.getAllCategories();
    }

    @ApiOperation({
        summary: "Получение всех категорий содержащихся в другой категории",
    })
    @ApiResponse({ status: 200, type: [Cat] })
    @Get("/superCat/:id")
    getCategoriesBySuperCat(@Param("id") id) {
        return this.catsService.getCategoriesBySuperCat(id);
    }
}
