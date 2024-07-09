import express from 'express';
import {messageSend} from '../controller/messageController.js'
const router =express.Router()

router.post('/send',messageSend);

export default router;