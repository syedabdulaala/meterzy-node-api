import bodyParser from 'body-parser';
import express from 'express';
import * as fs from 'fs';
import 'reflect-metadata';
import { Config } from '../utils/config.model';
import { Routes } from './routes';

export class App {

    public static readonly config: Config =
        JSON.parse(fs.readFileSync(`${process.cwd()}\\config\\${process.env.NODE_ENV}\\config.json`, 'utf8'));
    public app: express.Application;

    constructor() {
        this.app = express();
        this.generatePaths();
        this.configBase();
        this.configRoutes();
    }

    private configBase(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private configRoutes(): void {
        const routes = new Routes(this.app);
        routes.registerAuthRoutes();
        routes.registerLiteralRoutes();
        routes.registerMeterRoutes();
        routes.registerTariffRoutes();
    }

    private generatePaths() {
        App.config.paths = {
            jwtPrivateKey: `${process.cwd()}\\config\\${process.env.NODE_ENV}\\jwt-private.key`,
            jwtPublicKey: `${process.cwd()}\\config\\${process.env.NODE_ENV}\\jwt-public.key`,
        };
    }
}

export default new App().app;
