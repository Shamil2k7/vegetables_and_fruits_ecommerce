import express from 'express'
import { loginUser, signupUser, updateAddress, updateProfile, getAllUsers,blockUser,unblockUser } from '../controller/logincontroller.js'
import { verifyToken } from '../middleware/authmiddleware.js'
export const authRouter=express.Router()


authRouter.post('/login',loginUser)
authRouter.post('/singup',signupUser)
authRouter.put("/profile/:userId",updateProfile);
authRouter.post('/:userId/address',verifyToken,updateAddress)
authRouter.put("/profile/:userId",verifyToken,updateProfile);
authRouter.get("/all",verifyToken,getAllUsers);
/* ===== BLOCK ===== */
authRouter.put("/block/:id",verifyToken,blockUser);
/* ===== UNBLOCK ===== */
authRouter.put("/unblock/:id",verifyToken,unblockUser);
