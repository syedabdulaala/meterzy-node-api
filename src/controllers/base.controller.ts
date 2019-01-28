import { Response } from 'express';

export abstract class BaseController {

    protected badRequest(res: Response, err: { message: string, code?: string }) {
        res.status(400).send(err);
    }

    protected success(res: Response, body?: object) {
        if (body) {
            res.status(200).send(body);
        } else {
            res.status(200).send();
        }
    }

    protected serverError(res: Response, err?: { message: string, code?: string }) {
        res.status(500).send(err);
    }
}
