import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) {
        super();
    }

    public async login(req: Request, res: Response): Promise<void> {
        const user = await this.userService.getUser(req.body.email);
        if (this.authService.verifyPassword(req.body.password, user)) {
            const payload = { id: user.id };
            const resBody = { displayName: user.displayName, token: this.authService.getSignedJwt(payload) };
            res.send(resBody);
        } else {
            this.badRequest(res, { message: 'Invalid email or password' });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        const values = {
            displayName: req.body.displayName,
            email: req.body.email,
            password: req.body.password,
        };

        const user = await this.userService.userExist(values.email);
        if (user) {
            this.badRequest(res, { message: 'Email already exist' });
        }

        const id = await this.userService.addUser(values);
        if (id) {
            this.success(res);
        } else {
            this.serverError(res);
        }
    }
}
