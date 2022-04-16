import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Banner } from "./banners.model";
import { CreateBannerDto } from "./dto/create-banner.dto";

@Injectable()
export class BannersService {
    constructor(@InjectModel(Banner) private bannerRepository: typeof Banner) {}

    async create(createBannerDto: CreateBannerDto) {
        return this.bannerRepository.create(createBannerDto);
    }

    async getBannersByType(type: string) {
        return this.bannerRepository.findAll({ where: { type } });
    }

    async getBannerById(id: number) {
        return this.bannerRepository.findOne({ where: { id } });
    }
}
