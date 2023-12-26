import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

import { MulterModule } from '@nestjs/platform-express';


@Module({
    providers: [ImagesService],
    controllers: [ImagesController],
    imports: [
        MulterModule.register(),
    ]
})
export class ImagesModule {}
