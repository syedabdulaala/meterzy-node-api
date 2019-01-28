import { Request, Response } from 'express';

export class LiteralController {
    public get(req: Request, res: Response): void {
        res.send('Get literals');
    }
}
