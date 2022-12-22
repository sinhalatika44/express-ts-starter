import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

//health check
router.get('/hc', async(req: Request, res: Response) => {
    res.json({error: false, code: 200});
});

export = router;