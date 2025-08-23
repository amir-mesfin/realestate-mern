import express from 'express'
import {testing,
        updateProfile,
        deleteUSer,
        getUserListing,
        makeAdmin,
        acceptanceRequestSeller,
        getRequest,
        getUSer,
        requestSeller} from '../controllers/userController.js';
import { verifyToken } from '../utils/verrifyUser.js';
const router = express.Router();

router.get("/test", testing);
router.get('/requestSeller', getRequest);
router.post('/make-admin', verifyToken , makeAdmin)
router.post('/request-seller/:id', verifyToken, requestSeller);
router.post('/accept/requestSeller/:id', acceptanceRequestSeller);
router.post("/update/:id", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, deleteUSer);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/:id', verifyToken, getUSer);

export default  router;

