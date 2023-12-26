import { Injectable } from '@nestjs/common';
import {BlobServiceClient} from '@azure/storage-blob';

@Injectable()
export class ImagesService {
    private readonly containerName: string = "images";
    private readonly connectionString: string = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";

    private blobClient: BlobServiceClient;

    constructor() {
        this.blobClient = BlobServiceClient.fromConnectionString(this.connectionString);
    }

    async createContainerIfNotExists() {
        const containerClient = this.blobClient.getContainerClient(this.containerName);
        await containerClient.createIfNotExists({access: "container"});
    }

    async uploadFiles(files) {
        const promises: Promise<string>[] = [];
        for (let i = 0; i < files.length; i++) {
            promises.push(new Promise((resolve) => {
                resolve(this.createBlob(files[i].buffer, files[i].size, files[i].originalname))
            }));
        }
        const urls: string[] = await Promise.all(promises);
        return urls;
    }
    private async createBlob(buffer: Buffer, bufferSize: number, fileName: string) {
        const containerClient = this.blobClient.getContainerClient(this.containerName);

        const blobName = `${Date.now()}-${fileName}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(buffer, bufferSize);

        return blockBlobClient.url;
    }
}
