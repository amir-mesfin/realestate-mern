import express from 'express'
import {testing,
        updateProfile,
        deleteUSer,
        getUserListing,
        getUSer} from '../controllers/userController.js';
import { verifyToken } from '../utils/verrifyUser.js';
const router = express.Router();

router.get("/test", testing)
router.post("/update/:id", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, deleteUSer);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/:id', verifyToken, getUSer)
export default  router;

