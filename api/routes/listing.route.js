import express from 'express';
import {createListing,
        deleteListing,
        updateListing,
        getUpdateList } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verrifyUser.js';

const router = express.Router();


router.post('/create',verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id',verifyToken, updateListing);
router.get('/getList/:id', getUpdateList)


export  default router;