import express from 'express';
import {sendToEmail,contactInformation, } from '../controllers/contact.controller.js';
import { verifyToken } from '../utils/verrifyUser.js';


const router = express.Router();


router.post('/send-to-email',verifyToken, sendToEmail);
router.post('/contactInformation',contactInformation)


export  default router;