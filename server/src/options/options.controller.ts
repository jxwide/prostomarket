import { Controller, Get } from "@nestjs/common";
import { OptionsService } from "./options.service";

@Controller("options")
export class OptionsController {
    constructor(private optionsService: OptionsService) {}

    @Get()
    getAllOptionsNames() {
        return this.optionsService.getAllOptionsNames();
    }
}
