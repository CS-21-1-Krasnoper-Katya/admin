import { Injectable } from '@nestjs/common';
import {TableServiceClient, TableClient} from '@azure/data-tables';
import { CreateGoodDto } from './dto/create-good.dto';
import { UniqueKeyService } from 'src/unique-key/unique-key.service';
import { EditGoodDto } from './dto/edit-good.dto';
import { DeleteGoodDto } from './dto/delete-good.dto';

@Injectable()
export class GoodsService {
    private readonly tableName: string = "goods";
    private readonly connectionString: string = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";

    private serviceClient: TableServiceClient;
    private tableClient: TableClient;

    constructor(private readonly uniqueKeyService: UniqueKeyService) {
        this.serviceClient = TableServiceClient.fromConnectionString(this.connectionString, {allowInsecureConnection: true});
        this.tableClient = TableClient.fromConnectionString(this.connectionString, this.tableName, {allowInsecureConnection: true});
    }
    
    async createTableIfNotExists() {
        const tablesIter = this.serviceClient.listTables();
        const tables = [];
        for await (const table of tablesIter) {
            tables.push(table);
        }
        if (!tables.some(table => table.name === this.tableName))
            await this.serviceClient.createTable(this.tableName);
    }

    async getAllGoods() {
        const result = [];
        const entitiesIter = this.tableClient.listEntities();
        for await (const entity of entitiesIter) {
            result.push(entity);
        }
        console.log(result);
        return result;
    }

    async createGood(createGoodDto: CreateGoodDto) {
        const partitionKey = createGoodDto.category;
        const rowKey = this.uniqueKeyService.generateKey();
        await this.tableClient.createEntity({
            partitionKey,
            rowKey,
            ...createGoodDto
        });
    }

    async editGood(editGoodDto: EditGoodDto, partitionKey: string, rowKey: string) {
        const oldEntity = await this.tableClient.getEntity(partitionKey, rowKey);
        if (editGoodDto.category != oldEntity.category) {
            await this.deleteGood({partitionKey, rowKey});
            await this.createGood(editGoodDto);
        }
        else {
            const entity = {
                partitionKey,
                rowKey,
                ...editGoodDto
            };
            await this.tableClient.updateEntity(entity, "Replace");
        }
    }

    async deleteGood(deleteGoodDto: DeleteGoodDto) {
        await this.tableClient.deleteEntity(deleteGoodDto.partitionKey, deleteGoodDto.rowKey);
    }
}
