import express from 'express';
import {  registerUser,loginUser, forgotPassword, resetPassword } from '../Controllers/UserControllers.js';
// import AuthMiddleware from '../Middleware/AuthMiddleware.js';

const router=express.Router();

router.post('/userregister',registerUser);
router.post('/userlogin',loginUser);
router.post('/forgotpassword',forgotPassword)
router.post('/reset-password/:token',resetPassword)

export default router;