import { Connection, createConnection, MongoRepository } from 'typeorm';
import { AppUser } from './entities/app-user';
import { FixedTariff } from './entities/fixedTariff';
import { Meter } from './entities/meter';
import { MeterReading } from './entities/meter-reading';
import { RangedTariff } from './entities/rangedTariff';

export class MongoDbContext {

    private connection: Connection;
    private readonly URL: string;

    constructor(url: string) {
        this.URL = url;
        this.connect();
    }

    public getAppUserRepo(): MongoRepository<AppUser> {
        return this.connection.getMongoRepository(AppUser);
    }

    public getMeterRepo(): MongoRepository<Meter> {
        return this.connection.getMongoRepository(Meter);
    }

    public getMeterReadingRepo(): MongoRepository<MeterReading> {
        return this.connection.getMongoRepository(MeterReading);
    }

    public getRangedTariffRepo(): MongoRepository<RangedTariff> {
        return this.connection.getMongoRepository(RangedTariff);
    }

    public getFixedTariffRepo(): MongoRepository<FixedTariff> {
        return this.connection.getMongoRepository(FixedTariff);
    }

    private async connect() {
        this.connection = await createConnection({
            entities: [`${__dirname}\\entities\\*{.ts,.js}`],
            type: 'mongodb',
            url: this.URL,
            useNewUrlParser: true,
        });
        console.log('Database connected successfully');
    }
}
