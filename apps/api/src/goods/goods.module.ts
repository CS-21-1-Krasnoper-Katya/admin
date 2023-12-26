import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { UniqueKeyModule } from 'src/unique-key/unique-key.module';

@Module({
  providers: [GoodsService],
  controllers: [GoodsController],
  imports: [
    UniqueKeyModule
  ]
})
export class GoodsModule {}
