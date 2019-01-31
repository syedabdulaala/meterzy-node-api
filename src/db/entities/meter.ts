import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Audit } from './audit';
import { FixedTariff } from './fixedTariff';
import { MeterReading } from './meter-reading';
import { RangedTariff } from './rangedTariff';

@Entity()
export class Meter extends Audit {
    @ObjectIdColumn()
    public id: string;

    @Column()
    public userId: string;

    @Column()
    public name: string;

    @Column()
    public accountNo: string;

    @Column()
    public consumerNo: string;

    @Column((type) => FixedTariff)
    public fixedTariffs?: FixedTariff[];

    @Column((type) => RangedTariff)
    public rangedTariffs?: RangedTariff[];

    @Column((type) => MeterReading)
    public readings?: MeterReading[];
}
