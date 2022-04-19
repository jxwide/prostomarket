import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Cat } from "./cats.model";

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat) private catRepository: typeof Cat) {}

    async createCategory(createCategoryDto: CreateCategoryDto) {
        return this.catRepository.create(createCategoryDto);
    }

    async getCategoryByValue(value: string) {
        return this.catRepository.findOne({ where: { name: value } });
    }

    async getCategoryById(id: number) {
        return this.catRepository.findOne({ where: { id } });
    }

    async getSubCategories(superCatId: number) {
        return this.catRepository.findAll({ where: { superCatId } });
    }

    async getAllCategories() {
        return this.catRepository.findAll({ include: { all: true } });
    }

    async getCategoriesBySuperCat(id: number) {
        return this.catRepository.findAll({
            include: { all: true },
            where: { superCatId: id },
        });
    }
}
