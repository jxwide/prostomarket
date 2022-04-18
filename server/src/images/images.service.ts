import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Image } from "./images.model";
import { CreateImageDto } from "./dto/create-image.dto";

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image) private imageRepository: typeof Image) {}

    async create(createImageDto: CreateImageDto) {
        return this.imageRepository.create(createImageDto);
    }
}
