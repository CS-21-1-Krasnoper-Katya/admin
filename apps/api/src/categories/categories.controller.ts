import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body 
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
        this.categoriesService.createTableIfNotExists();
    }

    @Get()
    async getAll() {
        return await this.categoriesService.getAllCategories();
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Put(':partitionKey/:rowKey')
    async update(@Body() editCategoryDto: EditCategoryDto, @Param('partitionKey') partitionKey: string, @Param('rowKey') rowKey: string) {
        return await this.categoriesService.editCategory(editCategoryDto, partitionKey, rowKey);
    }

    @Delete(':partitionKey/:rowKey')
    async delete(@Param('partitionKey') partitionKey: string, @Param('rowKey') rowKey: string) {
        return await this.categoriesService.deleteCategory({partitionKey, rowKey});
    }
}
