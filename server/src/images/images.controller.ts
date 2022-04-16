import { Body, Controller, Get, Post } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { AddNewImageDto } from "./dto/add-new-image.dto";

@Controller("images")
export class ImagesController {
    constructor(private imagesService: ImagesService) {}

    @Get()
    getAllImages() {
        return this.imagesService.getAllImages();
    }

    @Post()
    addNewImage(@Body() dto: AddNewImageDto) {
        return this.imagesService.addNewImage(dto);
    }
}
