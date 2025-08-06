import express from 'express';
import { google, signin, signup, updateProfile } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.put("/update-profile",updateProfile);

export default router