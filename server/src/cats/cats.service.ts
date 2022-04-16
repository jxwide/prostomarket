import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Cat } from "./cats.model";

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat) private catRepository: typeof Cat) {}

    async createCategory(createCategoryDto: CreateCategoryDto) {
        const category = await this.catRepository.create(createCategoryDto);
        if (createCategoryDto.superCat) {
            await category.$add("subСats", createCategoryDto.superCat);
        }
        return category;
    }

    async getCategoryByValue(value: string) {
        return this.catRepository.findOne({ where: { name: value } });
    }

    async getCategoryById(id: number) {
        return this.catRepository.findOne({ where: { id } });
    }

    async getAllCategories() {
        return this.catRepository.findAll({ include: { all: true } });
    }
}
