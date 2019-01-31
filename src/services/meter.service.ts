import { FixedTariff } from '../db/entities/fixedTariff';
import { Meter } from '../db/entities/meter';
import { RangedTariff } from '../db/entities/rangedTariff';
import { MongoDbContext } from '../db/mongo-db-context';

export class MetersService {

    private readonly mongoContext: MongoDbContext;

    constructor(mongoContext: MongoDbContext) {
        this.mongoContext = mongoContext;
    }

    public async getAll(userId: string): Promise<Meter[]> {
        return await this.mongoContext.getMeterRepo().find({ userId });
    }

    public async addNew(values: {
        userId: string, name: string, accountNo: string, consumerNo: string,
        fixedTariffs?: FixedTariff[], rangedTariffs?: RangedTariff[],
    }): Promise<Meter> {
        let meter = new Meter();
        meter.userId = values.userId;
        meter.accountNo = values.accountNo;
        meter.consumerNo = values.consumerNo;
        meter.createdOn = new Date();
        meter.deleted = false;
        meter.fixedTariffs = values.fixedTariffs;
        meter.rangedTariffs = values.rangedTariffs;
        meter = await this.mongoContext.getMeterRepo().save(meter);
        return meter;
    }

    public async getExist(consumerNo: string): Promise<Meter> {
        return await this.mongoContext.getMeterRepo().findOne({ consumerNo });
    }
}
