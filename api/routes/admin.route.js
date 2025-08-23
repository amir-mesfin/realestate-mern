import express from 'express';
import {GetAllUser,DeleteUser} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verrifyUser.js';

const router = express.Router();



router.get('/getUSer',verifyToken, GetAllUser);
router.delete('/deleteUser/:id', verifyToken, DeleteUser);

export  default router;