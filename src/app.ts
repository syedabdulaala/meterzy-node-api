import bodyParser from 'body-parser';
import express from 'express';
import { MongoDbContext } from './db/mongo-db-context';
import { Routes } from './routes/routes';

class App {

    public app: express.Application;
    private mongoDb: MongoDbContext;

    constructor() {
        this.app = express();
        this.configBase();
        this.configDatabase();
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

    private async configDatabase() {
        this.mongoDb = new MongoDbContext('');
        await this.mongoDb.connect();
    }
}

export default new App().app;
