import { Column } from 'typeorm';

export abstract class Audit {
    @Column()
    public deleted: boolean;

    @Column()
    public createdOn: Date;

    @Column()
    public lastModifiedOn?: Date;
}
