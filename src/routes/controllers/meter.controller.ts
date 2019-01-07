import { Request, Response } from 'express';

export class MeterController {
    public get(req: Request, res: Response): void {
        res.send('Get meters');
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
