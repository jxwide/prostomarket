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

    async getAllOptionsNames() {
        let options = await this.optionRepository.findAll();
        let optionsNames = [];

        for (let i = 0; i < options.length; i++) {
            optionsNames.push(options[i]["dataValues"].title);
        }

        let uniqueArray = optionsNames.filter(function (item, pos) {
            return optionsNames.indexOf(item) == pos;
        });

        return uniqueArray;
    }
}
