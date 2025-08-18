import express from 'express';
import {sendToEmail, } from '../controllers/contact.controller.js';


const router = express.Router();


router.post('/send-to-email', sendToEmail);



export  default router;