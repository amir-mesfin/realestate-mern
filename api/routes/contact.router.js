import express from 'express';
import {sendToEmail,
        contactInformation,
        getMessage,
        deleteMessage} from '../controllers/contact.controller.js';
import { verifyToken } from '../utils/verrifyUser.js';


const router = express.Router();

router.get('/getMessage' ,verifyToken, getMessage);
router.post('/send-to-email',verifyToken, sendToEmail);
router.post('/contactInformation',contactInformation)
router.delete('/deleteMassage/:id', verifyToken, deleteMessage)


export  default router;