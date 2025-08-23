import express from 'express';
import {GetAllUser} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verrifyUser.js';

const router = express.Router();



router.get('/getUSer',verifyToken, GetAllUser);


export  default router;