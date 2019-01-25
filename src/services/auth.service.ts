import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { getMongoManager, MongoEntityManager } from 'typeorm';
import { App } from '../app';
import { AppUser } from '../db/entities/app-user';

export class AuthService {

    private readonly entityManager: MongoEntityManager;

    constructor() {
        this.entityManager = getMongoManager();
    }

    public async getUser(email: string): Promise<AppUser> {
        const emailHash = this.encrypt(email);
        return await this.entityManager.findOne(AppUser, { emailHash });
    }

    public async addUser(values: { displayName: string, email: string, password: string }): Promise<string> {
        try {
            const appUser: AppUser = new AppUser();
            appUser.createdOn = new Date();
            appUser.deleted = false;
            appUser.displayName = values.displayName;
            appUser.emailHash = this.encrypt(values.email);
            appUser.passwordHash = this.encrypt(values.password);
            appUser.status = 0;
            return (await this.entityManager.save(appUser)).id;
        } catch (error) {
            return null;
        }
    }

    public verifyPassword(password: string, user: AppUser): boolean {
        if (!password || !user) {
            return false;
        }
        const passwordHash = this.encrypt(password);
        return user.passwordHash === passwordHash;
    }

    public verifyJwt(token: string) {
        const publicKey: string = fs.readFileSync(`../../config/${process.env.NODE_ENV}/jwt-public.key`, 'utf8');
        const verifyOptions: jwt.VerifyOptions = App.config.jwtVerifyOptions;
        return jwt.verify(token, publicKey, verifyOptions);
    }

    public getSignedJwt(payload: object) {
        const privateKey: string = fs.readFileSync(`../../config/${process.env.NODE_ENV}/jwt-private.key`, 'utf8');
        const signOptions: jwt.SignOptions = App.config.jwtSignOptions;
        return jwt.sign(payload, privateKey, signOptions);
    }

    private encrypt(value: string) {
        return App.config.defaultSalt + value;
    }
}
