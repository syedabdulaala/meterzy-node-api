import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Audit } from './audit';

@Entity()
export class RangedTariff extends Audit {
    @ObjectIdColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public upperRange: number;

    @Column()
    public lowerRange: number;

    @Column()
    public charges: number;

    @Column()
    public unitType: number;
}
