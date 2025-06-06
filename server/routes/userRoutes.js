import express from 'express'
const router = express.Router();
import user from '../controller/usersController.js'
router.get('',user.getAllUsers)
router.post('/signup',user.createUser)
router.delete('/delete/:id',user.deleteUser)
router.post('/login',user.login)
router.get('/profile',user.getProfile)
router.get('/logout',user.logout)
router.patch('/update/:id',user.updateUser)
export default router