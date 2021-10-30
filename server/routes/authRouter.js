import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController';

const router = new Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

export default router;
