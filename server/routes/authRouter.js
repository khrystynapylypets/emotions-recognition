import { Router } from 'express';
import { signUp } from '../controllers/authController';

const router = new Router();

router.post('/sign-up', signUp);

export default router;
