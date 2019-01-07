import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Audit } from './audit';

@Entity()
export class FixedTariff extends Audit {
    @ObjectIdColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public charges: number;

    @Column()
    public unitType: number;
}
