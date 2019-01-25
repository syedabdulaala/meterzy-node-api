import { SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface Config {
    configName: string;
    database: Database;
    defaultSalt: string;
    jwtSignOptions: SignOptions;
    jwtVerifyOptions: VerifyOptions;
}

export interface Database {
    mongoDbUrl: string;
}
