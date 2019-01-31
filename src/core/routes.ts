import * as express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { LiteralController } from '../controllers/literal.controller';
import { MeterController } from '../controllers/meter.controller';
import { TariffController } from '../controllers/tariff.controller';
import { MongoDbContext } from '../db/mongo-db-context';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { App } from './app';

export class Routes {

    private readonly app: express.Application;
    private readonly authService: AuthService;
    private readonly userService: UserService;

    constructor(app: express.Application) {
        this.app = app;
        const mongoContext = new MongoDbContext(App.config.database.mongoDbUrl);
        this.authService = new AuthService();
        this.userService = new UserService(mongoContext);
    }

    public registerLiteralRoutes() {
        this.app.route('/literals').get(this.authorize, (req, res) => {
            const literal = new LiteralController(res.locals.payload);
            literal.get(req, res);
        });
    }

    public registerAuthRoutes() {
        this.app.route('/register').post((req, res) => {
            const auth = new AuthController(this.authService, this.userService);
            auth.register(req, res);
        });
        this.app.route('/login').post((req, res) => {
            const auth = new AuthController(this.authService, this.userService);
            auth.login(req, res);
        });
    }

    public registerMeterRoutes() {
        this.app.route('/meters').get(this.authorize, (req, res) => {
            const meter = new MeterController(res.locals.payload);
            meter.get(req, res);
        });
        this.app.route('/meter').put(this.authorize, (req, res) => {
            const meter = new MeterController(res.locals.payload);
            meter.add(req, res);
        });
        this.app.route('/meter').post(this.authorize, (req, res) => {
            const meter = new MeterController(res.locals.payload);
            meter.update(req, res);
        });
        this.app.route('/meter').delete(this.authorize, (req, res) => {
            const meter = new MeterController(res.locals.payload);
            meter.delete(req, res);
        });
    }

    public registerTariffRoutes() {
        this.app.route('/tariffs').get(this.authorize, (req, res) => {
            const tariff = new TariffController(res.locals.payload);
            tariff.get(req, res);
        });
        this.app.route('/tariff').put(this.authorize, (req, res) => {
            const tariff = new TariffController(res.locals.payload);
            tariff.add(req, res);
        });
        this.app.route('/tariff').post(this.authorize, (req, res) => {
            const tariff = new TariffController(res.locals.payload);
            tariff.update(req, res);
        });
        this.app.route('/tariff').delete(this.authorize, (req, res) => {
            const tariff = new TariffController(res.locals.payload);
            tariff.delete(req, res);
        });
    }

    private authorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.locals.payload = this.authService.ensureAuthenticated(req.headers.authorization);
            if (res.locals.payload) {
                next();
            } else {
                res.status(403).send({ message: 'Please login.' });
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(403).send({ message: 'Please login again.' });
            }
        }
    }
}
