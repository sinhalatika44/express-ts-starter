import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/auth/login', async(req: Request, res: Response) => {
    let payload = req.body;
    return res.send({error: false, payload});
});

export = router;