import express from 'express';
import {
  handleShareContent,
  handleGetSharedContent,
} from '../controllers/share.controller';
import { verifyLogin } from '../middleware/auth.middleware';
const router = express.Router();

router.post('/share', verifyLogin, handleShareContent);
router.get('/share', handleGetSharedContent);
export default router;
