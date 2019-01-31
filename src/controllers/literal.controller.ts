import { Request, Response } from 'express';

export class LiteralController {

    private count = 0;
    public get(req: Request, res: Response): void {
        this.count += 1;
        res.send(`Get literals: ${this.count}`);
    }
}
