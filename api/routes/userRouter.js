import express from 'express'
import {testing,
        updateProfile,
        deleteUSer} from '../controllers/userController.js';
import { verifyToken } from '../utils/verrifyUser.js';
const router = express.Router();

router.get("/test", testing)
router.post("/update/:id", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, deleteUSer);

export default  router;

