import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { App } from '../core/app';
import { Helper } from '../core/helper';
import { AppUser } from '../db/entities/app-user';

export class AuthService {

    public verifyPassword(password: string, user: AppUser): boolean {
        if (!password || !user) {
            return false;
        }
        const passwordHash = Helper.getHash(password);
        return user.passwordHash === passwordHash;
    }

    public verifyJwt(token: string) {
        const publicKey: string = fs.readFileSync(App.config.paths.jwtPublicKey, 'utf8');
        const verifyOptions: jwt.VerifyOptions = App.config.jwtVerifyOptions;
        return jwt.verify(token, publicKey, verifyOptions);
    }

    public getSignedJwt(payload: object) {
        const privateKey: string = fs.readFileSync(App.config.paths.jwtPrivateKey, 'utf8');
        const signOptions: jwt.SignOptions = App.config.jwtSignOptions;
        return jwt.sign(payload, privateKey, signOptions);
    }

    public ensureAuthenticated(authorization: string): string | object {
        if (authorization) {
            const tokenParts = authorization.split(' ');
            if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
                const payload = this.verifyJwt(tokenParts[1]);
                if (payload) {
                    return payload;
                }
            }
        }
        return null;
    }
}
