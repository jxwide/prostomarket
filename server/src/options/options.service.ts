import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Option } from "./options.model";
import { CreateOptionDto } from "./dto/create-option.dto";

@Injectable()
export class OptionsService {
    constructor(@InjectModel(Option) private optionRepository: typeof Option) {}

    async create(createOptionDto: CreateOptionDto) {
        return this.optionRepository.create(createOptionDto);
    }
}
