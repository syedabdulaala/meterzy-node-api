import { Helper } from '../core/helper';
import { AppUser } from '../db/entities/app-user';
import { MongoDbContext } from '../db/mongo-db-context';

export class UserService {

    private readonly mongoContext: MongoDbContext;

    constructor(mongoContext: MongoDbContext) {
        this.mongoContext = mongoContext;
    }

    public async getUser(email: string): Promise<AppUser> {
        const emailHash = Helper.getHash(email);
        return await this.mongoContext.getAppUserRepo().findOne({ emailHash });
    }

    public async addUser(values: { displayName: string, email: string, password: string }): Promise<string> {
        try {
            const appUser: AppUser = new AppUser();
            appUser.createdOn = new Date();
            appUser.deleted = false;
            appUser.displayName = values.displayName;
            appUser.emailHash = Helper.getHash(values.email);
            appUser.passwordHash = Helper.getHash(values.password);
            appUser.status = 0;
            return (await this.mongoContext.getAppUserRepo().save(appUser)).id;
        } catch (error) {
            return null;
        }
    }

    public async userExist(email: string): Promise<AppUser> {
        const emailHash = Helper.getHash(email);
        return await this.mongoContext.getAppUserRepo().findOne({ emailHash });
    }
}
