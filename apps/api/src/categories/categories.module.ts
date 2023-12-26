import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UniqueKeyModule } from 'src/unique-key/unique-key.module';

@Module({
    providers: [CategoriesService],
    controllers: [CategoriesController],
    imports: [
        UniqueKeyModule
    ]
})
export class CategoriesModule {}
