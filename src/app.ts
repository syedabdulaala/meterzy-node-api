import bodyParser from 'body-parser';
import express from 'express';
import * as fs from 'fs';
import 'reflect-metadata';
import { MongoDbContext } from './db/mongo-db-context';
import { Routes } from './routes/routes';
import { Config } from './utils/config.model';

export class App {

    public static readonly config: Config =
        JSON.parse(fs.readFileSync(`${process.cwd()}\\config\\dev\\config.json`, 'utf8'));
    public app: express.Application;
    private mongoDb: MongoDbContext;

    constructor() {
        this.app = express();
        this.configBase();
        this.configDatabase()
            .then(() => {
                console.log('Database connection established.');
                this.configRoutes();
            })
            .catch((err) => {
                console.log(err);
            });
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

    private async configDatabase() {
        this.mongoDb = new MongoDbContext(App.config.database.mongoDbUrl);
        await this.mongoDb.connect();
    }
}

export default new App().app;
