import { SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface Config {
    configName: string;
    database: Database;
    defaultSalt: string;
    jwtSignOptions: SignOptions;
    jwtVerifyOptions: VerifyOptions;
    paths: Path;
}

export interface Database {
    mongoDbUrl: string;
}

export interface Path {
    jwtPublicKey: string;
    jwtPrivateKey: string;
}
