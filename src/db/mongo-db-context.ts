import { createConnection } from 'typeorm';
import { AppUser } from './entities/app-user';
import { Meter } from './entities/meter';
import { FixedTariff } from './entities/fixedTariff';
import { RangedTariff } from './entities/rangedTariff';

export class MongoDbContext {

    private readonly URL: string;

    constructor(url: string) {
        this.URL = url;
    }

    public async connect() {
        const connection = await createConnection({
            entities: [`${__dirname}\\entities\\*.ts`],
            type: 'mongodb',
            url: this.URL,
            useNewUrlParser: true,
        });
        connection.connect();
    }
}
