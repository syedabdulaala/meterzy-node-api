import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Audit } from './audit';
import { Meter } from './meter';

@Entity()
export class AppUser extends Audit {
    @ObjectIdColumn()
    public id: string;

    @Column()
    public displayName: string;

    @Column()
    public status: number;

    @Column()
    public emailHash: string;

    @Column()
    public passwordHash: string;

    @Column((type) => Meter)
    public meters: Meter[];
}
