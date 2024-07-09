import express from 'express';
import { deleteUser, getUsers, login, logoutUser, updateUser, userController } from '../controller/userController.js';
import {isUserAuthenticated} from '../middlewares/auth.js'
const router = express.Router();

router.post('/addUser', userController)
router.post('/login' ,login)
router.post('/logout' ,isUserAuthenticated,logoutUser)
router.get('/getUsers',getUsers)
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)

export default router;