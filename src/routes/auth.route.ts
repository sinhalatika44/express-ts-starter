import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// import interfaces from '../interfaces/index';
import authController from '../controllers/auth.controller';

router.post('/auth/login', async(req: Request, res: Response) => {
    let payload = req.body;
    const resp = await authController.login(payload);
    return res.send(resp);
});

export = router;