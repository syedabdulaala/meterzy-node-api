import * as express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { BaseController } from '../controllers/base.controller';
import { LiteralController } from '../controllers/literal.controller';
import { MeterController } from '../controllers/meter.controller';
import { TariffController } from '../controllers/tariff.controller';
import { MongoDbContext } from '../db/mongo-db-context';
import { AuthService } from '../services/auth.service';
import { MeterService } from '../services/meter.service';
import { UserService } from '../services/user.service';
import { App } from './app';

export class Routes {

    private readonly app: express.Application;
    private readonly authService: AuthService;
    private readonly userService: UserService;
    private readonly meterService: MeterService;

    constructor(app: express.Application) {
        this.app = app;
        const mongoContext = new MongoDbContext(App.config.database.mongoDbUrl);
        this.authService = new AuthService();
        this.userService = new UserService(mongoContext);
        this.meterService = new MeterService(mongoContext);
    }

    public registerLiteralRoutes() {
        this.app.route('/literals').get(this.authorize, (req, res) => {
            (this.getController('literal', res) as LiteralController).get(req, res);
        });
    }

    public registerAuthRoutes() {
        this.app.route('/register').post((req, res) => {
            (this.getController('auth', res) as AuthController).register(req, res);
        });
        this.app.route('/login').post((req, res) => {
            (this.getController('auth', res) as AuthController).login(req, res);
        });
    }

    public registerMeterRoutes() {
        this.app.route('/meters').get(this.authorize, (req, res) => {
            (this.getController('meter', res) as MeterController).get(req, res);
        });
        this.app.route('/meter').put(this.authorize, (req, res) => {
            (this.getController('meter', res) as MeterController).add(req, res);
        });
        this.app.route('/meter').post(this.authorize, (req, res) => {
            (this.getController('meter', res) as MeterController).update(req, res);
        });
        this.app.route('/meter').delete(this.authorize, (req, res) => {
            (this.getController('meter', res) as MeterController).delete(req, res);
        });
    }

    public registerTariffRoutes() {
        this.app.route('/tariffs').get(this.authorize, (req, res) => {
            (this.getController('tariff', res) as TariffController).get(req, res);
        });
        this.app.route('/tariff').put(this.authorize, (req, res) => {
            (this.getController('tariff', res) as TariffController).add(req, res);
        });
        this.app.route('/tariff').post(this.authorize, (req, res) => {
            (this.getController('tariff', res) as TariffController).update(req, res);
        });
        this.app.route('/tariff').delete(this.authorize, (req, res) => {
            (this.getController('tariff', res) as TariffController).delete(req, res);
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

    private getController(name: string, res: express.Response): BaseController {
        switch (name) {
            case 'auth':
                return new AuthController(this.authService, this.userService);
            case 'literal':
                return new LiteralController(res.locals.payload);
            case 'meter':
                return new MeterController(this.meterService, res.locals.payload);
            case 'tariff':
                return new TariffController(res.locals.payload);
        }
    }
}
