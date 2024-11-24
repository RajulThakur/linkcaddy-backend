import express from 'express';
import {
  handleSignin,
  handleSignup,
  handleLogout,
} from '../controllers/auth.controller';
const router = express.Router();
router.post('/signin', handleSignin);
router.post('/signup', handleSignup);
router.post('/logout', handleLogout);

export default router;
