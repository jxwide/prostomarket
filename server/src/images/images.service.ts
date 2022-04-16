import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Image } from "./images.model";
import { AddNewImageDto } from "./dto/add-new-image.dto";
import { CatsService } from "../cats/cats.service";
import { ProductsService } from "../products/products.service";

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Image) private imageRepository: typeof Image,
        private catsService: CatsService,
        private productsService: ProductsService,
    ) {}

    async getAllImages() {
        return this.imageRepository.findAll({ include: { all: true } });
    }

    async addNewImage(dto: AddNewImageDto) {
        return undefined;
    }
}
