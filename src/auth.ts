import jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';

export const authorize = jwt({
    algorithms: ['RS256'],
    audience: 'http://localhost:60336',
    issuer: 'https://abdulaala.auth0.com/',
    secret: jwks.expressJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://abdulaala.auth0.com/.well-known/jwks.json',
        rateLimit: true,
    }),
});
