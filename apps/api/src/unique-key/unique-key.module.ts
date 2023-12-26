import { Module } from '@nestjs/common';
import { UniqueKeyService } from './unique-key.service';

@Module({
    providers: [UniqueKeyService],
    exports: [UniqueKeyService]
})
export class UniqueKeyModule {}
