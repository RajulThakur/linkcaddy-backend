import express from 'express';
import {
  handleShareContent,
  handleGetSharedContent,
} from '../controllers/share.controller';
const router = express.Router();

router.post('/share', handleShareContent);
router.get('/share', handleGetSharedContent);
export default router;
