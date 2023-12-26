import { Injectable } from '@nestjs/common';
import {TableServiceClient, TableClient} from '@azure/data-tables';

import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { UniqueKeyService } from 'src/unique-key/unique-key.service';

@Injectable()
export class CategoriesService {
    private categories: Array<object> = [];
    private readonly tableName: string = "categories";
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
        return this.categories;
    }

    async deleteTable() {
        await this.serviceClient.deleteTable(this.tableName);
    }

    async getAllCategories() {
        const result = [];
        const entitiesIter = this.tableClient.listEntities();
        for await (const entity of entitiesIter) {
            result.push(entity);
        }
        console.log(result);
        return result;
    }

    async createCategory(createCategoryDto: CreateCategoryDto) {
        const partitionKey = 'category';
        const rowKey = this.uniqueKeyService.generateKey();
        await this.tableClient.createEntity({
            partitionKey,
            rowKey,
            ...createCategoryDto
        });
    }

    async editCategory(editCategoryDto: EditCategoryDto, partitionKey: string, rowKey: string) {
        const entity = {
            partitionKey,
            rowKey,
            ...editCategoryDto
        };
        await this.tableClient.updateEntity(entity, "Replace");
    }

    async deleteCategory(deleteCategoryDto: DeleteCategoryDto) {
        await this.tableClient.deleteEntity(deleteCategoryDto.partitionKey, deleteCategoryDto.rowKey);
    }
}
