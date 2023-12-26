import { 
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {
        this.imagesService.createContainerIfNotExists();
    }
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@UploadedFiles() files: object[]) {
        return await this.imagesService.uploadFiles(files);
    }
}
