import { Router } from 'express';
import authRouter from './authRouter';

const router = new Router();

router.use('/api/auth', authRouter);

export default router;
