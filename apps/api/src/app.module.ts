import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { CategoriesModule } from './categories/categories.module';
import { GoodsModule } from './goods/goods.module';
import { ImagesModule } from './images/images.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    CategoriesModule,
    GoodsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
