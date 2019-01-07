import { Request, Response } from 'express';

export class AuthController {
    public login(req: Request, res: Response): void {
        res.send('Login invoked');
    }

    public register(req: Request, res: Response): void {
        res.send('Register invoked');
    }
}
