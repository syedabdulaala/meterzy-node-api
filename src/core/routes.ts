import * as express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { LiteralController } from '../controllers/literal.controller';
import { MeterController } from '../controllers/meter.controller';
import { TariffController } from '../controllers/tariff.controller';
import { MongoDbContext } from '../db/mongo-db-context';
import { AuthService } from '../services/auth.service';
import { App } from './app';

export class Routes {

    private readonly app: express.Application;
    private readonly authService: AuthService;

    constructor(app: express.Application) {
        this.app = app;
        this.authService = new AuthService(new MongoDbContext(App.config.database.mongoDbUrl));
    }

    public registerLiteralRoutes() {
        const literal = new LiteralController();
        this.app.route('/literals').get(this.authorize, (req, res) => literal.get(req, res));
    }

    public registerAuthRoutes() {
        const auth = new AuthController(this.authService);
        this.app.route('/register').post((req, res) => auth.register(req, res));
        this.app.route('/login').post((req, res) => auth.login(req, res));
    }

    public registerMeterRoutes() {
        const meter = new MeterController();
        this.app.route('/meters').get(this.authorize, (req, res) => meter.get(req, res));
        this.app.route('/meter').put(this.authorize, (req, res) => meter.add(req, res));
        this.app.route('/meter').post(this.authorize, (req, res) => meter.update(req, res));
        this.app.route('/meter').delete(this.authorize, (req, res) => meter.delete(req, res));
    }

    public registerTariffRoutes() {
        const tariff = new TariffController();
        this.app.route('/tariffs').get(this.authorize, (req, res) => tariff.get(req, res));
        this.app.route('/tariff').put(this.authorize, (req, res) => tariff.add(req, res));
        this.app.route('/tariff').post(this.authorize, (req, res) => tariff.update(req, res));
        this.app.route('/tariff').delete(this.authorize, (req, res) => tariff.delete(req, res));
    }

    private authorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return this.authService.ensureAuthenticated(req, res, next);
    }
}
