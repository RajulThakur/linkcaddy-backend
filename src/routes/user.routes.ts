import { Router } from 'express';
import { handleGetUser } from '../controllers/user.controller';

const router = Router();

router.get('/user', handleGetUser);
export default router;
