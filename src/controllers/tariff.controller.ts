import { Request, Response } from 'express';
import { BaseController } from './base.controller';

export class TariffController extends BaseController {

    public get(req: Request, res: Response): void {
        res.send('Get tariffs');
    }

    public add(req: Request, res: Response): void {
        res.send('Add tariff ' + JSON.stringify(req.body));
    }

    public update(req: Request, res: Response): void {
        res.send('Update tariff ' + JSON.stringify(req.body));
    }

    public delete(req: Request, res: Response): void {
        if (!req.query.id) {
            res.send('Please specify tariff id in query string');
        } else {
            res.send('Delete tariff of id ' + req.query.id);
        }
    }
}
