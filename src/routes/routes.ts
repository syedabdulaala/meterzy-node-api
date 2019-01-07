import * as express from 'express';
import { authorize } from '../auth';
import { AuthController } from './controllers/auth.controller';
import { LiteralController } from './controllers/literal.controller';
import { MeterController } from './controllers/meter.controller';
import { TariffController } from './controllers/tariff.controller';

export class Routes {

    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }

    public registerLiteralRoutes() {
        const literal = new LiteralController();
        this.app.route('/literals').get(literal.get);
    }

    public registerAuthRoutes() {
        const auth = new AuthController();
        this.app.route('/auth/register').post(auth.register);
        this.app.route('/auth/login').post(auth.login);
    }

    public registerMeterRoutes() {
        const meter = new MeterController();
        this.app.route('/meters').get(authorize, meter.get);
        this.app.route('/meter').put(meter.add);
        this.app.route('/meter').post(meter.update);
        this.app.route('/meter').delete(meter.delete);
    }

    public registerTariffRoutes() {
        const tariff = new TariffController();
        this.app.route('/tariffs').get(tariff.get);
        this.app.route('/tariff').put(tariff.add);
        this.app.route('/tariff').post(tariff.update);
        this.app.route('/tariff').delete(tariff.delete);
    }
}
