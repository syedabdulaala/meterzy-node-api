import { Request, Response } from 'express';
import { MeterService } from '../services/meter.service';
import { BaseController } from './base.controller';

export class MeterController extends BaseController {

    constructor(
        private readonly meterService: MeterService,
        payload?: { id: string }) {
        super(payload);
    }

    public async get(req: Request, res: Response): Promise<void> {
        const meters = await this.meterService.getAll(this.payload.id);
        this.success(res, meters);
    }

    public add(req: Request, res: Response): void {
        res.send('Add meter ' + JSON.stringify(req.body));
    }

    public update(req: Request, res: Response): void {
        res.send('Update meter ' + JSON.stringify(req.body));
    }

    public delete(req: Request, res: Response): void {
        if (!req.query.id) {
            res.send('Please specify meter id in query string');
        } else {
            res.send('Delete meter of id ' + req.query.id);
        }
    }
}
