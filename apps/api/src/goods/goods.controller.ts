import { 
    Controller,
    Get,
    Post, 
    Put, 
    Delete, 
    Param, 
    Body 
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { EditGoodDto } from './dto/edit-good.dto';

@Controller('goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {
        this.goodsService.createTableIfNotExists();
    }

    @Get()
    async getAll() {
        return await this.goodsService.getAllGoods();
    }

    @Post()
    async create(@Body() createGoodDto: CreateGoodDto) {
        return await this.goodsService.createGood(createGoodDto);
    }

    @Put(':partitionKey/:rowKey')
    async update(@Body() editGoodDto: EditGoodDto, @Param('partitionKey') partitionKey: string, @Param('rowKey') rowKey: string) {
        return await this.goodsService.editGood(editGoodDto, partitionKey, rowKey);
    }

    @Delete(':partitionKey/:rowKey')
    async delete(@Param('partitionKey') partitionKey: string, @Param('rowKey') rowKey: string) {
        return await this.goodsService.deleteGood({partitionKey, rowKey});
    }
}
