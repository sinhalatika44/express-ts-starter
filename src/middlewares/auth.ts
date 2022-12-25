import jwt from '../utils/JWT';
import { Request, Response, NextFunction } from 'express';

import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req?.headers?.authorization || null;
        if(!authorization) {
            return res.sendStatus(401).send('401 Unauthorized');
        } else {
            jwt.verify(authorization, (err: any, decoded: any) => {
                if(err) {
                    next(new WrongAuthenticationTokenException());
                } else {
                    console.log('token is valid');
                    next();
                }
            });
        }
    } catch(e) {
        console.log('error in auth middleware', e);
        next(new WrongAuthenticationTokenException());
    }
};

export default authMiddleware;