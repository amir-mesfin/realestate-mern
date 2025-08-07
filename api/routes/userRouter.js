import express from 'express'
import {testing,updateProfile} from '../controllers/userController.js';
import { verifyToken } from '../utils/verrifyUser.js';
const router = express.Router();

router.get("/test", testing)
router.post("/update/:id", verifyToken, updateProfile);

export default  router;

