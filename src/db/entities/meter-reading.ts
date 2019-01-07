import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Audit } from './audit';

@Entity()
export class MeterReading extends Audit {
    @ObjectIdColumn()
    public id: string;

    @Column()
    public reading: number;

    @Column()
    public notedOn: Date;
}
