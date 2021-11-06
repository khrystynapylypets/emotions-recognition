import { Router } from 'express';
import authRouter from './authRouter';
import videoRouter from './videoRouter';

const router = new Router();

router.use('/api/auth', authRouter);
router.use('/api/video', videoRouter);

export default router;
