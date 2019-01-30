import * as crypto from 'crypto';
import { App } from './app';

export class Helper {
    public static getHash(data: string) {
        const sha256 = crypto.createHmac('sha256', App.config.defaultSalt);
        sha256.update(data);
        return sha256.digest('hex');
    }
}
