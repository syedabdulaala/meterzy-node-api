import { Request, Response } from 'express';
import { BaseController } from './base.controller';

export class LiteralController extends BaseController {

    private count = 0;
    public get(req: Request, res: Response): void {
        this.count += 1;
        res.send(`Get literals: ${this.count}`);
    }
}
